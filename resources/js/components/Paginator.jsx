import React from "react";
import clsx from 'clsx'

const Paginator = ({meta, links, onPaginateButtonClick}) => {
    return (
        <div className="flex items-center justify-between   bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700 inline-flex gap-x-1">
                        Showing
                        <span className="font-medium">{meta.from}</span>
                        to
                        <span className="font-medium">{meta.to}</span>
                        of
                        <span className="font-medium">{meta.total}</span>
                        results
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">

                        {meta.links.map(link => <button
                            dangerouslySetInnerHTML={{__html: link.label}}
                            onClick={() => onPaginateButtonClick(link.url)}
                            key={link.label}
                            className={clsx('relative hidden items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 md:inline-flex', link.active && 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600')}></button>
                        )}
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Paginator
