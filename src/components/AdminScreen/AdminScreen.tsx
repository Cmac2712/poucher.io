import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton } from '../LoginButton';
import { LogoutButton } from '../LogoutButton'
import { Bookmarks } from '../Bookmarks'
import { CreateBookmark } from "../CreateBookmark";
import { Tags } from '../Tags'
import { Pagination } from "../Pagination";
import { Profile } from "../Profile";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { Loader } from "../Loader/Loader";
import { Search } from "../Search";
import { PageProvider } from "../../contexts/page-context";
import { UserProvider } from '../../contexts/user-context';

export interface Auth0User {
    sub: string
    email: string
    given_name: string
}

export const AdminScreen = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <Loader /> 

  if (!user) return <p>no user</p>

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
        <PageProvider>
          <UserProvider user={user}>
          <div className="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content pt-24 mb-20 flex flex-col relative">

              <label htmlFor="my-drawer-2" className="btn btn-ghost fixed z-50 left-5 top-5 drawer-button lg:hidden">
                <FontAwesomeIcon icon={faBars} />
              </label>

              <header className='fixed flex justify-end z-20 top-0 right-0 left-0 p-4 px-4 bg-base-200'>
                  <Search />
              </header>

              <Bookmarks authorID={user?.sub} />

              <footer className="fixed flex flex-row justify-between bottom-0 left-0 lg:left-80 right-0 bg-base-300 p-4 w-100 border-t-2 border-base-100">
                <div className="relative z-20 h-12">
                  <Pagination />
                </div>
                <div className="absolute right-20 z-10">
                </div>
                <div className="absolute right-4">
                  <CreateBookmark />
                </div>
              </footer>

            </div>
            <div className="drawer-side">
              <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
              <div
                className="menu d-flex flex-col overflow-y-auto w-80 text-base-content bg-base-200"
              >
                <div>
                  { user &&
                    <Profile
                      user={user}
                    />
                  }
                </div>

                <Tags />

                <div className="p-4 mt-auto">
                  <LogoutButton />
                </div>
              </div>
            </div>
          </div>
          </UserProvider>
        </PageProvider>
      </>
    )
  }

  return <></>
};