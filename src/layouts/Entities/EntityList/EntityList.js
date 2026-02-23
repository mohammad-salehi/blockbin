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
                <div>
                    {
                        row.metadata.image !== null ?
                            <img src={row.metadata.image} className='w-6 inline-block' />
                            :
                            <ImageNotSupportedIcon />
                    }
                    <a className='mr-2' href={`/panel/entity/${row.id}`}>
                        {row.name}
                    </a>
                </div>
            ),
        },
        {
            header: "وبسایت", accessorKey: "hash",

            cell: (row) => (
                <div>
                    {
                        row.metadata.web_site !== null ?
                            <a href={row.metadata.web_site}>{row.metadata.web_site}</a>
                            :
                            <span>
                                نامشخص
                            </span>
                    }
                </div>
            ),
        },
        {
            header: "نام حقوقی", accessorKey: "legal_name",
            cell: (row) => (
                <div className='p-0'>
                    {
                        row.metadata.legal_name !== null ?
                            <p>{row.metadata.legal_name}</p>
                            :
                            <span>
                                نامشخص
                            </span>
                    }
                </div>
            ),
        },
        {
            header: "ریسک", accessorKey: "TokenInfo",
            cell: (row) => (
                <div className='p-0'>
                    {
                        row.riskscore !== null ?
                            <p>{row.riskscore * 100}%</p>
                            :
                            <span>
                                نامشخص
                            </span>
                    }
                </div>
            ),
        },
        {
            header: "دسته‌بندی", accessorKey: "website",
            cell: (row) => (
                <div className='p-0'>
                    {row.category.persian_name}
                </div>
            ),
        }
    ];

    return (
        <div>
            {
                TableLoading ?
                    <div className="overflow-x-auto rounded-2xl border border-boxBorderColor dark:border-boxColor-dark bg-TableBorder shadow-sm px-2 ">
                        <SkeletonLoading />
                    </div>
                    :
                    <ExpandableTable
                        data={Data}          // ← فقط دیتای فیلترشده را بده
                        columns={columns}
                        rowDetailsMode="row"
                        rowDetailsClassName="rounded-xl p-3"
                    />
            }

            <Pagination
                rtl
                totalItems={EntityNumber}
                pageSize={10}
                currentPage={pageNumber}
                onPageChange={
                    (e) => {
                        SetpageNumber(e)
                    }
                }
            />
        </div>
    )
}

export default EntityList
