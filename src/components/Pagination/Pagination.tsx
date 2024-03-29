import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import { usePage } from '../../contexts/page-context'

export const Pagination = () => {

    const { perPage, offset, setOffset, count } = usePage()
    const pages = count ? Math.ceil(count / perPage) : 1
    const currentPage = Math.floor(offset / perPage) + 1

    if (pages <= 1) return null

    return (
        <div className="flex basis-full max-w-3xl">
            <div className="btn-group flex-nowrap">
                <button
                    disabled={currentPage === 1}
                    onClick={() => {
                        setOffset(offset - perPage)
                    }}
                    className="btn btn-md"
                >
                    <FontAwesomeIcon icon={faAngleLeft} />
                </button>

                <button className={`btn md:hidden`}>Page { currentPage  }</button> 

                {
                    Array.from(Array(pages), (e, i) => {
                        return (
                            <button
                                key={i}
                                onClick={() => {
                                    setOffset(i * perPage)
                                }}
                                className={`btn btn-md hidden md:block ${currentPage === i + 1 ? 'btn-active' : ''}`}>
                                {i + 1}
                            </button>
                        )
                    })
                }

                <button
                    disabled={currentPage === pages}
                    onClick={() => {
                        setOffset(offset + perPage)
                    }}
                    className="btn btn-md"
                >
                    <FontAwesomeIcon icon={faAngleRight} />
                </button>
            </div>
        </div>
    )
}