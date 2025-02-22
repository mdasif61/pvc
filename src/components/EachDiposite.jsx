import moment from 'moment';
import React from 'react';

const EachDiposite = ({ diposite }) => {
    return (
        <div>
            <div className="collapse collapse-arrow rounded-none bg-black bg-opacity-30 backdrop-blur-sm text-white px-3 py-2 my-1">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium"><h1 className='text-lg'>From <span className='font-bold'>{moment(diposite.date.startDate).format('D-MM-Y')}</span> To <span className='font-bold'>{moment(diposite.date.endDate).format("D-MM-Y")}</span></h1></div>
                <div className="collapse-content">
                    <div>
                        <div className='flex items-center justify-between'>
                            <h1>Total Collected :</h1>
                            <span>{diposite.totalCollected} tk/-</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <h1>Total Expense :</h1>
                            <span>{diposite.totalExpense} tk/-</span>
                        </div>
                        <hr />
                        <div className='flex items-center justify-between'>
                            <h1>Diposite In Office :</h1>
                            <span>{diposite.diposite} tk/-</span>
                        </div>
                        <hr />
                        <div className='flex items-center justify-between'>
                            <h1>Due :</h1>
                            <span>{(diposite.totalCollected - diposite.totalExpense - diposite.diposite)} tk/-</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default EachDiposite;