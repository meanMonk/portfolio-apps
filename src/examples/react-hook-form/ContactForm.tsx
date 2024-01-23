import { FC } from 'react'
import { useController, useForm } from 'react-hook-form'

const FeedbackForm: FC = () => {

  const { control, handleSubmit } = useForm({
    mode: 'onChange'
  })

  const {
    field: { ref, onChange, value },
    fieldState: { error },
  } = useController({
    name: 'message',
    control,
    rules: {
      required: 'Message is required!'
    }
  })

  const onSave = (data: any) => {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      className='container-fluid flex flex-col px-20 py-4 gap-2 bg-white border w-2/5'>
      <h2 className="text-2xl text-indigo-500">📫  Feedback Form </h2>
      <textarea
        onChange={onChange}
        ref={ref}
        value={value}
        placeholder='Share your feedback'
        rows={4}
        className="px-2 py-4 border border-gray-300 rounded-md h-100" />
      {error && <span className='text-red-400 text-sm italic'>{error.message}</span>}

      <button type='submit' className='bg-indigo-400 w-3/12 p-2 rounded-md text-white' >Save</button>
    </form>
  )
}

export default FeedbackForm