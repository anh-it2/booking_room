
const Loading = () => {
  return (
    <div className='flex gap-1 items-center'>
        <span className='w-3 h-3 bg-blue-800 rounded-full animate-[pulseFade_0.6s_infinite] [animation-delay:-0.3s] transition-all duration-100 ease-in-out'></span>
        <span className='w-3 h-3 bg-blue-800 rounded-full animate-[pulseFade_0.6s_infinite] [animation-delay:-0.2s] transition-all duration-100 ease-in-out'></span>
        <span className='w-3 h-3 bg-blue-800 rounded-full animate-[pulseFade_0.6s_infinite] transition-all duration-300 ease-in-out'></span>
    </div>
  )
}

export default Loading