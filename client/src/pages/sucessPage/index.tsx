import { useStudentStore } from "@/stores/useStudentStore"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const SuccessPage = () => {
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const paymentId = params.get('paymentId')
  const payerId = params.get('PayerID')
  const {checkpayment} = useStudentStore()
  useEffect(()=>{
    if(paymentId && payerId ){
      checkpayment(paymentId ,  payerId)
    }
  },[])
  return (
    <section className='w-full flex  items-center  justify-center h-[400px]'>
      <span className="font-text text-2xl font-archivo ">
        Proccessing your payment...
      </span>

    </section>
  )
}

export default SuccessPage