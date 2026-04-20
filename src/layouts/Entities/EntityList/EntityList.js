import React from 'react'
import ExpandableTable from '@/components/ExpandableTable/ExpandableTable';
import Pagination from '@/components/Pagination/Pagination';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import SkeletonLoading from '@/components/SkeletonLoading/SkeletonLoading';

const EntityList = ({ Data, EntityNumber, pageNumber, SetpageNumber, TableLoading }) => {

    const columns = [
        {
            header: "عنوان",
            accessorKey: "logo",
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bgColor to-bgColor/80 
                                  border border-boxBorderColor/60 flex items-center justify-center overflow-hidden">
                        {row.metadata?.image ? (
                            <img src={row.metadata.image} className='w-5 h-5 object-contain' alt={row.name} />
                        ) : (
                            <ImageNotSupportedIcon className='w-4 h-4 text-textTitleColor' />
                        )}
                    </div>
                    <a className='text-textColor hover:text-primary transition-colors font-medium' href={`/panel/entity/${row.id}`}>
                        {row.name}
                    </a>
                </div>
            ),
        },
        {
            header: "وبسایت", 
            accessorKey: "hash",
            cell: (row) => (
                <div>
                    {row.metadata?.web_site ? (
                        <a href={row.metadata.web_site} className='text-primary hover:underline text-sm' target="_blank" rel="noopener noreferrer">
                            {row.metadata.web_site.length > 40 ? row.metadata.web_site.substring(0, 40) + '...' : row.metadata.web_site}
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
                <div className='p-0'>
                    {row.metadata?.legal_name ? (
                        <p className='text-textColor text-sm'>{row.metadata.legal_name}</p>
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
                const riskScore = row.riskscore ? row.riskscore * 100 : null;
                const getRiskColor = (score) => {
                    if (score === null) return 'text-textTitleColor';
                    if (score < 25) return 'text-green-500';
                    if (score < 50) return 'text-blue-500';
                    if (score < 70) return 'text-orange-500';
                    return 'text-red-500';
                };
                return (
                    <div className='flex items-center gap-2'>
                        {riskScore !== null ? (
                            <>
                                <div className={`w-2 h-2 rounded-full ${getRiskColor(riskScore)} animate-pulse`}></div>
                                <p className={`font-bold ${getRiskColor(riskScore)}`}>{riskScore}%</p>
                            </>
                        ) : (
                            <span className='text-textTitleColor text-sm'>نامشخص</span>
                        )}
                    </div>
                );
            },
        },
        {
            header: "دسته‌بندی", 
            accessorKey: "website",
            cell: (row) => (
                <span className='px-2 py-1 rounded-full bg-bgColor/50 border border-boxBorderColor/40 text-textColor text-xs'>
                    {row.category?.persian_name || 'نامشخص'}
                </span>
            ),
        }
    ];

    return (
        <div className='space-y-5'>
            {/* Table Container - Glassmorphic */}
            <div className="overflow-x-auto rounded-2xl bg-gradient-to-br from-bgColor/60 to-bgColor/30 
                          border border-boxBorderColor/60 shadow-md backdrop-blur-sm">
                {TableLoading ? (
                    <div className="p-4">
                        <SkeletonLoading />
                    </div>
                ) : Data && Data.length > 0 ? (
                    <ExpandableTable
                        data={Data}
                        columns={columns}
                        rowDetailsMode="row"
                        rowDetailsClassName="rounded-xl p-4 bg-bgColor/40 backdrop-blur-sm border-t border-boxBorderColor/30"
                        className="w-full"
                    />
                ) : (
                    <div className="text-center py-12">
                        <div className="text-textTitleColor">هیچ موجودیتی یافت نشد</div>
                    </div>
                )}
            </div>

            {/* Pagination - Modernized */}
            {EntityNumber > 0 && (
                <div className="flex justify-center mt-4">
                    <Pagination
                        rtl
                        totalItems={EntityNumber}
                        pageSize={10}
                        currentPage={pageNumber}
                        onPageChange={(e) => SetpageNumber(e)}
                        className="bg-bgColor/40 backdrop-blur-sm rounded-xl border border-boxBorderColor/40 p-1"
                    />
                </div>
            )}
        </div>
    )
}

export default EntityList