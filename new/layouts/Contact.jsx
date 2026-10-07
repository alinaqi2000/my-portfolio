import React from 'react'
import classNames from 'clsx'
import { useForm, FormProvider } from 'react-hook-form'
import ContentRenderer from '@/components/ContentRenderer'
import Reveal from '@/components/Reveal'
import FormInput from '@/components/FormInput'
import FormTextarea from '@/components/FormTextarea'
import FormSelect from '@/components/FormSelect'
import FormCheckbox from '@/components/FormCheckbox'
import FormRadio from '@/components/FormRadio'
import Button from '@/components/Button'
import { SlCheck } from 'react-icons/sl'
import { config } from '../theme.config'

const { inputs } = config.contactForm || {}

const FormComponent = {
  text: FormInput,
  textarea: FormTextarea,
  select: FormSelect,
  radio: FormRadio,
  checkbox: FormCheckbox,
}

const ErrorMessage = ({ errors, name }) =>
  errors[name] ? (
    <div className="border-term-red/40 text-term-red mb-4 block rounded border bg-red-500/5 px-4 py-2 font-mono text-sm">
      {errors[name].message}
    </div>
  ) : null

const SuccessMessage = () => (
  <Reveal animation="fade-in">
    <div className="bg-night/95 absolute inset-0 z-20 flex h-full w-full items-center justify-center">
      <div className="max-w-md text-center">
        <SlCheck className="text-term-green mx-auto text-5xl" />
        <h5 className="mt-4">Thank you for contacting me.</h5>
        <p>I will get back to you as soon as possible.</p>
        <div className="text-ink-faint mt-4 font-mono text-xs">$ message queued — exit code 0</div>
      </div>
    </div>
  </Reveal>
)

const Contact01 = ({ main = {} }) => {
  const methods = useForm()
  const {
    register,
    formState: { errors, isValidating, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    setError,
    clearErrors,
  } = methods

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/contact-form`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
          'Content-Type': 'application/json',
          credentials: 'same-origin',
        }),
      })
      if (res.status === 201) {
        return true
      }
      const json = await res.json()
      if (json.error) {
        throw json.error
      }
    } catch (error) {
      setError('service', { type: 'serviceSideError', message: error })
    }
  }

  React.useEffect(() => {
    if (errors.service && isValidating) {
      clearErrors('service')
    }
  }, [isValidating, errors.service, clearErrors])

  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
      <div className="items-start gap-12 lg:flex">
        <Reveal animation="fade-in slide-in-right" className="prose prose-invert basis-1/3 lg:mr-6">
          <ContentRenderer source={main} />
        </Reveal>
        <Reveal animation="fade-in zoom-in" className="glass-stage mt-12 max-w-3xl lg:mt-0 lg:flex-1">
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="glass-border glass relative overflow-hidden rounded-lg border shadow-2xl shadow-black/50">
                {isSubmitSuccessful && <SuccessMessage />}
                <div className="terminal-titlebar">
                  <span className="terminal-dot bg-term-red" />
                  <span className="terminal-dot bg-term-yellow" />
                  <span className="terminal-dot bg-term-green" />
                  <span className="text-ink-faint ml-3 font-mono text-xs">
                    $ new-message --to alinaqi
                  </span>
                </div>
                <div className="glass-subtle">
                  {inputs?.map(({ legend, columns, fields }, i) => (
                    <fieldset key={i} className="border-line border-b border-dashed">
                      <div className="glass-subtle p-4">
                        <legend className="text-term-orange m-0 p-0 font-mono text-xs uppercase tracking-widest">
                          {legend}
                        </legend>
                      </div>
                      <div
                        className={classNames('grid gap-4 p-5', {
                          'md:grid-cols-2': columns === 2,
                          'md:grid-cols-3': columns === 3,
                        })}
                      >
                        {fields.map((input, j) => {
                          const Component = FormComponent[input.type]
                          return input.type && Component ? (
                            <div key={(input.id || input.name) + j} className="flex items-center">
                              <Component {...input} {...register(input.id || input.name)} />
                            </div>
                          ) : null
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>
                <div className="glass-subtle px-5 pb-8 pt-6 text-left">
                  <ErrorMessage errors={errors} name="service" />
                  <Button
                    as="button"
                    type="submit"
                    size="md"
                    variant="accent"
                    className="w-full sm:w-1/3"
                    disabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </form>
          </FormProvider>
        </Reveal>
      </div>
    </div>
  )
}
export default Contact01
