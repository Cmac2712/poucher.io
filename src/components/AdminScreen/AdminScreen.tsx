import { useAuth0 } from "@auth0/auth0-react";
import { LoginButton } from "../LoginButton";
import { LogoutButton } from '../LogoutButton'
import { Bookmarks } from '../Bookmarks'
import { CreateBookmark } from "../CreateBookmark";
import { Pagination } from "../Pagination";
import { Profile } from "../Profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Loader } from "../Loader/Loader";
import { PageProvider } from "../../contexts/page-context";


export const AdminScreen = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loader /> 

  if (!isAuthenticated) {
    return (
      <div className="flex column items-center justify-center h-screen gradient-brand">
        <header className="fixed w-full flex justify-end top-0 p-2">
          <LoginButton />
        </header>
        <h1 className="text-5xl font-bold text-white">Bookmarks</h1>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <>
        <div className="drawer drawer-mobile">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content pt-20 mb-20 lg:pt-5 flex flex-col relative">

            <label htmlFor="my-drawer-2" className="btn btn-ghost fixed z-50 left-5 top-5 drawer-button lg:hidden">
              <FontAwesomeIcon icon={faBars} />
            </label>

            <PageProvider>
              <Bookmarks authorID={user?.sub} />


              <footer className="fixed flex flex-col md:flex-row bottom-0 left-0 lg:left-80 right-0 bg-base-300 p-4 w-100 border-t-2 border-base-100">
                <div className="mb-4 md:mb-0">
                  <Pagination/>
                </div>
                <div className="md:ml-auto">
                  <CreateBookmark/>
                </div>
              </footer>
            </PageProvider>

          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
            <ul className="menu d-flex flex-col overflow-y-auto w-80 text-base-content bg-base-200">
              <li className="bg-base-300">
                <Profile />
              </li>

              <li className="p-4 mt-auto">
                <LogoutButton />
              </li>
            </ul>
          </div>
        </div>
      </>
    )
  }

  return <></>
};