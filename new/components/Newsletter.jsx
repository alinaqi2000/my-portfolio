import React from 'react'
import { useForm } from 'react-hook-form'
import FormInput from '@/components/FormInput'
import Button from '@/components/Button'
import { IoClose } from 'react-icons/io5'

const IntroMessage = () => (
  <div className="prose prose-invert">
    <h3>
      <em>Stay Tuned</em>
    </h3>
    <h6 className="!text-ink-mute">Want to level up your web dev game?</h6>
    <small>
      The best articles, links and news related to web development delivered once a week to your
      inbox.
    </small>
  </div>
)

const ErrorMessage = ({ errors, name }) =>
  errors[name] ? (
    <div className="block bg-red-500/5 px-4 py-1 text-xs text-term-red">{errors[name].message}</div>
  ) : null

const SuccessMessage = ({ handleReset }) => (
  <div className="my-6 mx-auto flex max-w-md justify-between rounded border border-line bg-night-surface p-3">
    <span className="font-mono text-sm text-term-green">
      ✔ Subscribed — please check your inbox and confirm your email.
    </span>
    <button onClick={() => handleReset()} className="h-5 w-5 hover:bg-night-raised" aria-label="Dismiss">
      <IoClose className="mx-auto h-4 w-4 text-ink-faint" />
    </button>
  </div>
)

const Newsletter = ({ className }) => {
  const {
    register,
    formState: { errors, isValidating, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    setError,
    clearErrors,
    reset,
  } = useForm()

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`/api/subscribe`, {
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
    <div className={className}>
      <IntroMessage />
      {isSubmitSuccessful ? (
        <SuccessMessage handleReset={reset} />
      ) : (
        <form
          className="relative mx-auto my-6 flex items-start justify-between"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mr-3 inline-block grow">
            <FormInput
              disabled={isSubmitting}
              type="text"
              name="email"
              placeholder="johndoe@example.com"
              aria-label="email address"
              hasError={errors.email || errors.service}
              {...register('email', {
                required: {
                  value: true,
                  message: 'Email is required.',
                },
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                  message: 'Email is invalid.',
                },
              })}
            />
            <div className="absolute bottom-full left-0 z-10">
              <ErrorMessage errors={errors} name="email" />
              <ErrorMessage errors={errors} name="service" />
            </div>
          </div>
          <Button as="button" type="submit" size="xs" variant="accent" disabled={isSubmitting}>
            Subscribe
          </Button>
        </form>
      )}
      <p className="font-mono text-xs text-ink-faint">No spam. Unsubscribe anytime.</p>
    </div>
  )
}

export default Newsletter
