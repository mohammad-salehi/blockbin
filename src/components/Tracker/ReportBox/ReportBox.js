import React, { useState } from 'react';
import { Button, Label } from 'reactstrap';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const ReportModal = ({ Data, PaintedEdges }) => {

    const [Color, SetColor] = useState(null);
    const [data, Setdata] = useState(null);
    const [showDownload, setShowDownload] = useState(false);
    const [ShowLabel, setShowLabel] = useState(true);
    const [ShowOwner, setShowOwner] = useState(true);
    const [ShowTxHash, setShowTxHash] = useState(true);
    

    function extractAndOrderPaths(array1, array2) {
        const idMap = array1.reduce((map, item) => {
            map[item.id] = item;
            return map;
        }, {});
        const colorConnections = array2.reduce((map, conn) => {
            if (!map[conn.from]) map[conn.from] = [];
            map[conn.from].push({ to: conn.to, color: conn.color });
            return map;
        }, {});
        const rawPaths = {};
        for (const fromId in colorConnections) {
            const fromItem = idMap[fromId];
            if (!fromItem || fromItem.type !== 'address') continue;
            for (const conn of colorConnections[fromId]) {
                const txItem = idMap[conn.to];
                if (!txItem || txItem.type !== 'transaction') continue;
                if (colorConnections[txItem.id]) {
                    for (const nextConn of colorConnections[txItem.id]) {
                        const toItem = idMap[nextConn.to];
                        if (!toItem || toItem.type !== 'address') continue;
                        const pathKey = `${fromId}-${toItem.id}`;
                        if (!rawPaths[pathKey]) {
                            rawPaths[pathKey] = {
                                fromAddress: fromItem,
                                transactions: [txItem],
                                toAddress: toItem,
                                color: conn.color
                            };
                        } else {
                            rawPaths[pathKey].transactions.push(txItem);
                        }
                    }
                }
            }
        }
        const paths = Object.values(rawPaths);
        const orderedPaths = [];
        const usedPaths = new Set();
        const findPathsStartingWith = (addressId) => {
            return paths.filter(path =>
                path.fromAddress.id === addressId && !usedPaths.has(`${path.fromAddress.id}-${path.toAddress.id}`)
            )
        };
        let startAddresses = paths.filter(path =>
            !paths.some(p => p.toAddress.id === path.fromAddress.id)
        ).map(p => p.fromAddress.id);

        // اگر نقطه شروع پیدا نشد، از اولین آدرس استفاده کن
        if (startAddresses.length === 0 && paths.length > 0) {
            startAddresses = [paths[0].fromAddress.id];
        }
        for (const startAddress of startAddresses) {
            let currentAddress = startAddress;
            let foundPath;
            do {
                foundPath = findPathsStartingWith(currentAddress)[0];
                if (foundPath) {
                    orderedPaths.push(foundPath);
                    usedPaths.add(`${foundPath.fromAddress.id}-${foundPath.toAddress.id}`);
                    currentAddress = foundPath.toAddress.id;
                }
            } while (foundPath);
        }
        paths.forEach(path => {
            if (!usedPaths.has(`${path.fromAddress.id}-${path.toAddress.id}`)) {
                orderedPaths.push(path);
            }
        });

        return orderedPaths;
    }

    const exportToExcel = (data) => {
        const wb = XLSX.utils.book_new();
        const ws_data = [];
    
        // اضافه کردن عناوین ستون‌ها (سطر اول)
        const headers = [
            'آدرس مبدا', 
            ShowLabel ? 'برچسب آدرس مبدا' : '',
            ShowOwner ? 'مالک آدرس مبدا' : '',
            'آدرس مقصد',
            ShowLabel ? 'برچسب آدرس مقصد' : '',
            ShowOwner ? 'مالک آدرس مقصد' : '',
            'تعداد تراکنش‌ها',
            ShowTxHash ? 'شناسه تراکنش‌ها' : '',
            'حجم تراکنش‌ها',
            'مجموع حجم تراکنش‌ها'
        ];
        ws_data.push(headers.filter(header => header !== ''));
    
        // اضافه کردن مقادیر برای هر تراکنش در سطرهای بعدی
        data.forEach(item => {
            const transactionRows = []; // برای ذخیره ردیف‌های تراکنش‌ها
            let totalTransactionVolume = 0; // برای جمع کردن حجم تراکنش‌ها
    
            item.transactions.forEach((tx, index) => {
                const transactionVolume = item.fromAddress.outputs
                    .filter(output => tx.id === output.id)
                    .map(output => output.value)
                    .reduce((sum, value) => sum + value, 0); // جمع حجم تراکنش‌ها
    
                const token = tx.token || item.transactions[0].token; // اگر برای تراکنش نام توکن موجود بود از آن استفاده کن
    
                totalTransactionVolume += transactionVolume; // افزودن به مجموع
    
                const row = [
                    index === 0 ? item.fromAddress.id : '',  // فقط در اولین تراکنش آدرس مبدا
                    ShowLabel ? (index === 0 ? item.fromAddress.label : '') : '', // برچسب فقط برای اولین تراکنش
                    ShowOwner ? (index === 0 ? item.fromAddress.entity?.name : '') : '', // مالک فقط برای اولین تراکنش
                    index === 0 ? item.toAddress.id : '',    // فقط در اولین تراکنش آدرس مقصد
                    ShowLabel ? (index === 0 ? item.toAddress.label : '') : '', // برچسب فقط برای اولین تراکنش
                    ShowOwner ? (index === 0 ? item.toAddress.entity?.name : '') : '', // مالک فقط برای اولین تراکنش
                    index === 0 ? item.transactions.length : '', // تعداد تراکنش‌ها فقط در اولین تراکنش
                    ShowTxHash ? tx.id : '',  // شناسه تراکنش
                    ShowTxHash ? `${transactionVolume.toLocaleString()} ${token}` : '',  // حجم تراکنش به همراه توکن
                    ''  // اینجا مجموع حجم تراکنش‌ها را به طور موقت خالی می‌گذاریم
                ];
    
                transactionRows.push(row);
            });
    
            // برای اولین تراکنش، مجموع حجم تراکنش‌ها را وارد می‌کنیم
            transactionRows[0][9] = `${totalTransactionVolume.toLocaleString()} ${item.transactions[0].token}`;  // ستون مجموع حجم تراکنش‌ها به همراه توکن
    
            // اضافه کردن ردیف‌های تراکنش‌ها به داده‌ها
            ws_data.push(...transactionRows);
        });
    
        const ws = XLSX.utils.aoa_to_sheet(ws_data);
    
        // فعال کردن wrapText برای خطوط جدید در سلول
        const range = ws['!rows'] || [];
        range.forEach((row, idx) => {
            if (!row) return;
            if (ws_data[idx] && ws_data[idx][5]) {
                const cell = ws[`F${idx + 1}`];  // ستون F برای شناسه تراکنش‌ها
                if (cell) {
                    cell.s = { alignment: { wrapText: true } }; // فعال کردن wrapText
                }
            }
        });
    
        XLSX.utils.book_append_sheet(wb, ws, 'گزارش تراکنش‌ها');
    
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        saveAs(new Blob([excelBuffer]), 'Transaction_Report.xlsx');
    };
    
    const GetReport = () => {
        const filtredData = [];
        for (let i = 0; i < PaintedEdges.length; i++) {
            if (PaintedEdges[i].color === Color) {
                filtredData.push(PaintedEdges[i]);
            }
        }
        exportToExcel(extractAndOrderPaths(Data, filtredData));
    };

    return (
        <div>
            <h5>
                دریافت گزارش گراف
            </h5>
            <h6 className='mt-4'>
                گزارش براساس کدام رنگ از مسیرهای گراف ایجاد شود؟
            </h6>
            <div>
                <div onClick={() => { SetColor('red') }} style={{ borderWidth: '5px', borderColor: 'black', borderStyle: Color === "red" ? "solid" : "none", borderRadius: '4px', width: '32px', marginRight: '0px', height: '32px', background: 'red', display: 'inline-block', cursor: 'pointer' }}></div>
                <div onClick={() => { SetColor('green') }} style={{ borderWidth: '5px', borderColor: 'black', borderStyle: Color === "green" ? "solid" : "none", borderRadius: '4px', width: '32px', marginRight: '4px', height: '32px', background: 'green', display: 'inline-block', cursor: 'pointer' }}></div>
                <div onClick={() => { SetColor('orange') }} style={{ borderWidth: '5px', borderColor: 'black', borderStyle: Color === "orange" ? "solid" : "none", borderRadius: '4px', width: '32px', marginRight: '4px', height: '32px', background: 'orange', display: 'inline-block', cursor: 'pointer' }}></div>
                <div onClick={() => { SetColor('purple') }} style={{ borderWidth: '5px', borderColor: 'black', borderStyle: Color === "purple" ? "solid" : "none", borderRadius: '4px', width: '32px', marginRight: '4px', height: '32px', background: 'purple', display: 'inline-block', cursor: 'pointer' }}></div>
                <div onClick={() => { SetColor('rgb(173, 216, 230)') }} style={{ borderWidth: '5px', borderColor: 'black', borderStyle: Color === "rgb(173, 216, 230)" ? "solid" : "none", borderRadius: '4px', width: '32px', marginRight: '4px', height: '32px', background: 'rgb(173, 216, 230)', display: 'inline-block', cursor: 'pointer' }}></div>
            </div>
            <small>
                * تنها درصورتی که آدرس ورودی و خروجی یک تراکنش هردو به یک رنگ باشند، آن تراکنش در گزارش لحاظ خواهد شد
            </small>
            <Button
                color='secondary'
                style={{ width: '100%' }}
                onClick={GetReport}
                disabled={!Color}
            >
                دریافت گزارش Excel
            </Button>
        </div>
    );
};

export default ReportModal;
