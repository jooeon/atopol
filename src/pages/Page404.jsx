import {Link} from "react-router-dom";

const Page404 = () => {

  return (
    <>
      <main>
        <div className="flex flex-col justify-center items-center w-full h-screen">
          <h1 className="text-[10vw] text-customOrange">404</h1>
          <Link to="/" rel="noopener noreferrer"
                className="text-link after:bg-customBlack dark:after:bg-customWhite">
            allentopolski.com
          </Link>
        </div>
      </main>
    </>
  )

}

export default Page404;