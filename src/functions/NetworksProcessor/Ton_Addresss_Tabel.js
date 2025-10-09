export const Ton_Addresss_tabel = (data, address, symbole, decimal) => {

    const outputs = [];
    const inputs = [];
    const outAndIN = { outputs: outputs, inputs: inputs, isError: false, address, symbole, Label: false, entity: false }

    try {
        data.events.forEach(event => {
            event.actions.forEach(action => {
                const senderAddress = action?.[action.type]?.sender?.address;
                const recipientAddress = action?.[action.type]?.recipient?.address;
                const accountAddress = event.account.address;
                const simplePreviewValue = action?.simple_preview?.value || "";
                const numericValue = simplePreviewValue.split(" ")[0];
                
                if (action.type === 'TonTransfer') {
                    symbole = 'TON'
                } else if (action.type === 'JettonTransfer') {
                    symbole = action.JettonTransfer?.jetton?.symbol
                }

                // console.log(symbole)

                // بررسی اینکه account.address با sender.address یکی باشد
                if (accountAddress === senderAddress) {
                    // بررسی نوع اکشن و اضافه کردن آدرس به خروجی
                    if (action.type === "TonTransfer" || action.type === "JettonTransfer") {
                        // console.log('Output')
                        outputs.push({
                            address: recipientAddress,
                            addressEntity: '',
                            addressLabel: '',
                            entity:'',
                            symbole,
                            currencyType:symbole,
                            amount: Number(numericValue),
                            value: Number(numericValue),
                            ValueInDollar: 0,
                            hash: event.event_id,
                            entity: '',
                            blockNumber: 0,
                            time: event.timestamp,
                            date: event.timestamp,
                            fee: 0,
                            type:'out',
                        });

                    }
                } else {
                    if (action.type === "TonTransfer" || action.type === "JettonTransfer") {
                        // console.log('input')
                        inputs.push({
                            address: recipientAddress,
                            addressEntity: '',
                            addressLabel: '',
                            entity:'',
                            symbole,
                            currencyType:symbole,
                            amount: Number(numericValue),
                            value: Number(numericValue),
                            ValueInDollar: 0,
                            hash: event.event_id,
                            entity: '',
                            blockNumber: 0,
                            time: event.timestamp,
                            date: event.timestamp,
                            fee: 0,
                            type:'in',
                        });
                    }
                }
            });
        });
        return outAndIN;
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }







}




// import React, { useState, useEffect } from 'react'
// // import { ProxyAddress } from '../../../address'
// // import { PostRequest } from '../../../newProcessors/PostRequest'
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import { Card, CardTitle, CardHeader } from 'reactstrap';
// import moment from 'jalali-moment'
// // import NiceAddress2 from '../../../components/niceAddress2/niceAddress';
// import UNKWN from '/images/unkwn-token1.png'
// // import NoData from '../../../components/NoData/NoData';
// import { format } from 'date-fns';
// // import LocalLoading from '../../../components/localLoading/localLoading';
// import { ProxyAddress } from '../../address';
// import { PostRequest } from '../../newProcessors/PostRequest';
// import NiceAddress2 from '../niceAddress2/niceAddress';
// import LocalLoading from '../localLoading/localLoading';
// import { useParams } from 'react-router-dom';

// const EventsTabel = () => {

//   const [gropEvents, setGropEvents] = useState([])
//   const [nextFrom, setNextFrom] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [Reload, SetReload] = useState(false)
//   const { hash } = useParams()

//   const fetchEvents = () => {
//   if (loading) return; // اگر در حال بارگذاری هستیم، از ارسال درخواست جلوگیری می‌شود

//   setLoading(true);
//   const url = `https://tonapi.io/v2/accounts/${hash}/events?limit=10${nextFrom ? `&before_lt=${nextFrom}` : ''}`;

//   PostRequest(`${ProxyAddress}/`, { url, is_blocked: true })
//     .then((response) => {
//       if (response.status === 200) {
//         // پردازش داده‌های دریافت شده با Ton_Addresss_tabel
//         const formattedData = Ton_Addresss_tabel(response.data, hash, 'TON', 9); // تغییر فرمت داده
//         const { inputs, outputs } = formattedData;

//         // ادغام ورودی‌ها و خروجی‌ها
//         const allTransactions = [...inputs, ...outputs];

//         setGropEvents((prevEvents) => {
//           const existingEventIDs = new Set(prevEvents.map((event) => event.hash)); // شناسه‌های موجود
//           const newEvents = allTransactions.filter((action) => !existingEventIDs.has(action.hash)); // داده‌های جدید

//           return [...prevEvents, ...newEvents]; // اضافه کردن داده‌های جدید
//         });

//         setNextFrom(response.data.next_from); // تنظیم next_from برای درخواست بعدی

//         // اگر next_from صفر باشد، داده‌ای بیشتر برای بارگذاری وجود ندارد
//         if (response.data.next_from === 0) {
//           setHasMore(false);
//         }
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     })
//     .finally(() => {
//       setLoading(false);
//     });
// };


//   useEffect(() => {
//     fetchEvents(); // بارگذاری اولیه داده‌ها
//   }, [hash]); // هر بار که hash تغییر کند، داده‌ها بارگذاری شوند


//   useEffect(() => {
//     if (gropEvents.length === 0 && hasMore && !loading) {
//       fetchEvents(); // درخواست اولیه به صورت خودکار
//     }
//   }, [gropEvents, hasMore, loading]);


//   console.log(gropEvents)


//   const timeEvent = (rowData) => {

//     if (rowData.timeStep) {
//       const jalaliDate = moment.unix(rowData.timeStep).format('jYYYY/jMM/jDD');
//       const timeDate = moment.unix(rowData.timeStep).format('HH:mm');
//       return (
//         <div style={{ display: 'flex', flexDirection: 'column' }}>
//           <p style={{ marginBottom: "-8px", fontSize: '13px', marginTop: '-8px', fontWeight: 'bold' }}>{jalaliDate}</p>
//           <small style={{ fontSize: '12px', color: 'gray' }}>{timeDate}</small>
//         </div>
//       )

//     }
//   }


//   const EventId = (rowData) => {
//     return (
//       <div>
//         <NiceAddress2 text={rowData.eventID} number={6} network={'TON'} type={'transaction'} />
//       </div>
//     )
//   }



//   const EventValue = (rowData) => {
//     if (rowData.type === 'TonTransfer') {
//       return (
//         <div style={{ direction: "ltr", textAlign: "right", marginTop: '-10px' }} className={` amountOption`}>
//           <small> {rowData.simple_preview.value} </small>
//         </div>
//       )
//     }
//     else if (rowData.type === 'JettonTransfer') {
//       return (
//         <div style={{ direction: "ltr", textAlign: "right", marginTop: '-10px' }} className={` amountOption`}>
//           <small> {rowData.simple_preview.value} </small>
//         </div>
//       )
//     }
//   }

//   function removeSelectedData(value) {
//     const getGraph = States.GraphData
//     for (let i = 0; i < getGraph.length; i++) {
//       if (getGraph[i].address === props.address) {
//         if (value.mode === 'in') {
//           let filtredData = getGraph[i].inputs
//           filtredData = filtredData.filter(obj => obj.hash !== value.hash)
//           getGraph[i].inputs = filtredData
//         } else if (value.mode === 'out') {
//           let filtredData = getGraph[i].outputs
//           filtredData = filtredData.filter(obj => obj.hash !== value.hash)
//           getGraph[i].outputs = filtredData
//         }
//       }
//     }
//   }


//   const addOrRemove = (row) => {
//     if (row.show) {
//       return (
//         <ion-icon name="remove-circle-outline" style={{ fontSize: '20px', marginBottom: '-6px', color: 'red', cursor: 'pointer' }} onClick={
//           () => {
//             removeSelectedData(row)
//             SetReload(!Reload)
//           }
//         }>y</ion-icon>
//       )
//     } else {
//       return (
//         <ion-icon style={{ fontSize: '20px', marginBottom: '-6px', color: 'green', cursor: 'pointer' }} name="add-circle-outline" onClick={() => {
//           addSelectedData(row)
//           SetReload(!Reload)
//         }}>no</ion-icon>
//       )
//     }
//   }



//   const TrValue = (row) => {
//     return (
//       <p style={{ color: row.mode === "in" ? "green" : "red", direction: 'ltr', fontSize: '13px', marginTop: '-12px', marginBottom: '-16px' }}>
//         {(((ShowUSD ? formatSmallNumber(row.valueInDollar) : formatSmallNumber(row.amount))))}
//         {' '}
//         {ShowUSD ? 'USD' : row.symbole}
//       </p>
//     )
//   }






//   return (
//     <div>

//       <Card className='mt-2' style={{ borderStyle: "solid", borderWidth: "1px", borderColor: "rgb(230,230,230)", borderRadius: '5px', overflow: 'hidden', background: 'linear-gradient(to bottom, rgba(255, 255, 255, .6) 0%, rgba(250, 250, 250, .6) 100%)', backdropFilter: 'blur(12px)' }}>
//         {/* {loading ? <LocalLoading /> : */}
//         <div>

//           <div>



//             <DataTable value={gropEvents} stripedRows tableStyle={{}} emptyMessage={<LocalLoading />} >
//               <Column body={addOrRemove} bodyStyle={{ textAlign: 'right', userSelect: 'text', width: '50px' }} ></Column>
//               <Column body={timeEvent} bodyStyle={{ textAlign: 'right', width: '150px' }} header=" تاریخ "></Column>
//               <Column body={EventId} bodyStyle={{ textAlign: 'right', width: '240px' }} header="آدرس تراکنش"></Column>
//               <Column body={EventValue} bodyStyle={{ textAlign: 'right', maxWidth: '10px' }} header="حجم تراکنش"></Column>

//             </DataTable>
//             {hasMore && (
//               <div className="p-d-flex p-jc-center">
//                 <button
//                   className="p-button p-component p-button-outlined my-4"
//                   style={{ borderRadius: '8px' }}
//                   onClick={fetchEvents}
//                   disabled={loading}
//                 >
//                   {loading ? 'در حال بارگذاری...' : 'بارگذاری بیشتر'}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//         {/* } */}
//       </Card>

//     </div>
//   )
// }

// export default EventsTabel