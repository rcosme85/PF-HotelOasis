import React from 'react'

const FooterComponent = () => {
  return (
    <div className="bg-white dark:bg-[#111827] py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <h2 className="text-center text-5xl font-semibold leading-8 text-gray-900 dark:text-white">
        Empresas con las cuales trabajamos
      </h2>
      <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
        <img
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1280px-Uber_logo_2018.svg.png"
          alt="Transistor"
          width={158}
          height={48}
        />
        <img
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Aerol%C3%ADneas_Argentinas_Logo_2010.svg/2560px-Aerol%C3%ADneas_Argentinas_Logo_2010.svg.png"
          alt="Reform"
          width={158}
          height={48}
        />
        <img
          className="col-span-2 max-h-12 w-full object-contain lg:col-span-1"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Booking.com_logo.svg/2560px-Booking.com_logo.svg.png"
          alt="Tuple"
          width={158}
          height={48}
        />
        <img
          className="col-span-2 max-h-12 w-full object-contain sm:col-start-2 lg:col-span-1"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Despegar.com_logo.svg/1280px-Despegar.com_logo.svg.png"
          alt="SavvyCal"
          width={158}
          height={48}
        />
        <img
          className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Trivago.svg/640px-Trivago.svg.png"
          alt="Statamic"
          width={158}
          height={48}
        />
      </div>
    </div>
  </div>
  )
}

export default FooterComponent