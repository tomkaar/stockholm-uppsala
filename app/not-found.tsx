import { LinkButton } from "./_components/LinkButton"

export const NotFound = () => (
  <div className="flex flex-col justify-center items-center mt-28 mb-20">
    <h2 className="text-base font-semibold text-indigo-600">404</h2>

    <div className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
      Kan inte hitta sidan du letar efter
    </div>

    <p className="mt-4 text-base leading-7 text-gray-600">
      Kan inte hitta sidan du letar efter.
    </p>

    <div className="mt-10">
      <LinkButton href="/">Hem</LinkButton>
    </div>
  </div>
)

export default NotFound
