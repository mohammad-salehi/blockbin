import React from 'react'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable'
import Pagination from '@/components/Pagination/Pagination'
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported'
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading'

const EntityList = ({ Data, EntityNumber, pageNumber, SetpageNumber, TableLoading }) => {

    const getRiskStyle = (score) => {
        if (score === null) return 'text-gray-400'

        if (score < 25) return 'text-green-500 bg-green-500/10'
        if (score < 50) return 'text-yellow-500 bg-yellow-500/10'
        if (score < 75) return 'text-orange-500 bg-orange-500/10'
        return 'text-red-500 bg-red-500/10'
    }

    const columns = [
        {
            header: "عنوان",
            accessorKey: "logo",
            cell: (row) => (
                <div className="flex items-center gap-3 min-w-0">
                    
                    <div className="w-9 h-9 rounded-xl bg-boxColor border border-boxBorderColor 
                    flex items-center justify-center overflow-hidden shrink-0">

                        {row.metadata?.image ? (
                            <img
                                src={row.metadata.image}
                                className='w-6 h-6 object-contain'
                                alt={row.name}
                            />
                        ) : (
                            <ImageNotSupportedIcon className='text-textTitleColor' fontSize="small" />
                        )}

                    </div>

                    <a
                        className='text-textColor hover:text-primary transition font-medium truncate'
                        href={`/panel/entity/${row.id}`}
                        title={row.name}
                    >
                        {row.name}
                    </a>

                </div>
            ),
        },

        {
            header: "وبسایت",
            accessorKey: "hash",
            cell: (row) => (
                <div className="max-w-[220px] truncate">

                    {row.metadata?.web_site ? (
                        <a
                            href={row.metadata.web_site}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='text-primary hover:underline text-sm'
                            title={row.metadata.web_site}
                        >
                            {row.metadata.web_site}
                        </a>
                    ) : (
                        <span className='text-textTitleColor text-sm'>نامشخص</span>
                    )}

                </div>
            ),
        },

        {
            header: "نام حقوقی",
            accessorKey: "legal_name",
            cell: (row) => (
                <div className="max-w-[220px] truncate">

                    {row.metadata?.legal_name ? (
                        <span className='text-textColor text-sm'>
                            {row.metadata.legal_name}
                        </span>
                    ) : (
                        <span className='text-textTitleColor text-sm'>نامشخص</span>
                    )}

                </div>
            ),
        },

        {
            header: "ریسک",
            accessorKey: "TokenInfo",
            cell: (row) => {

                const riskScore = row.riskscore !== null
                    ? (row.riskscore * 100).toFixed(1)
                    : null

                const style = getRiskStyle(riskScore)

                return (
                    <div className="whitespace-nowrap">

                        {riskScore !== null ? (
                            <span className={`px-2.5 py-1 text-xs rounded-lg font-semibold ${style}`}>
                                {riskScore}%
                            </span>
                        ) : (
                            <span className='text-textTitleColor text-sm'>
                                نامشخص
                            </span>
                        )}

                    </div>
                )
            },
        },

        {
            header: "دسته‌بندی",
            accessorKey: "website",
            cell: (row) => (
                <span className='px-2.5 py-1 rounded-lg bg-boxColor border border-boxBorderColor text-xs text-textColor whitespace-nowrap'>
                    {row.category?.persian_name || 'نامشخص'}
                </span>
            ),
        }
    ]

    return (
        <div className='space-y-6'>

            {/* Table Card */}
            <div className="overflow-x-auto rounded-2xl bg-boxColor border border-boxBorderColor shadow-sm">

                {TableLoading ? (
                    <div className="p-5">
                        <SkeletonLoading />
                    </div>
                ) : Data && Data.length > 0 ? (
                    <ExpandableTable
                        data={Data}
                        columns={columns}
                        rowDetailsMode="row"
                        rowDetailsClassName="p-4 border-t border-boxBorderColor bg-boxColor"
                        className="w-full"
                    />
                ) : (
                    <div className="text-center py-14 text-textTitleColor">
                        هیچ موجودیتی یافت نشد
                    </div>
                )}

            </div>

            {/* Pagination */}
            {EntityNumber > 0 && (
                <div className="flex justify-center">

                    <Pagination
                        rtl
                        totalItems={EntityNumber}
                        pageSize={10}
                        currentPage={pageNumber}
                        onPageChange={(e) => SetpageNumber(e)}
                    />

                </div>
            )}

        </div>
    )
}

export default EntityList
