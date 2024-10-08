import BorrowingRec from "../model/borrowing.js";
import moment from "moment";


export async function checkAndUpdateOverdue() {
    try {
        const records = await BorrowingRec.find({ status: { $ne: 'returned' } });

        const today = moment().format('YYYY/MM/DD');
        records.forEach(async (record) => {
            const dueDate = moment(record.due_date, 'YYYY/MM/DD');
            const todayDate = moment(today, 'YYYY/MM/DD');
            
            if (dueDate.isBefore(todayDate)) {
                const overdueDays = todayDate.diff(dueDate, 'days');
                record.status = 'overdue';
                record.overdue_days = overdueDays;
                await record.save();
            }
        });
        console.log('Overdue records updated successfully.');
    } catch (error) {
        console.error('Error updating overdue records:', error);
    }
}




