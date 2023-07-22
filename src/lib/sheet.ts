import { ListResponse } from "@/types";
import { utils as xlsx, writeFile } from 'xlsx';

export const generateSheet = (data: ListResponse) => {
    const filtered = data.questions.map(r => { return { no: r.no, title: r.title } });
    const worksheet = xlsx.json_to_sheet(filtered);
    const workbook = xlsx.book_new();
    xlsx.book_append_sheet(workbook, worksheet, "Sheet 1");
    xlsx.sheet_add_aoa(worksheet, [["No.", "Problems"]], { origin: "A1" })
    data.questions.forEach((row, index) => {
        worksheet[`B${index + 2}`].l = { Target: row.url, Tooltip: "Open problem" }
    })
    const max_width = filtered.reduce((w, r) => Math.max(w, r.title.length), 10);
    worksheet["!cols"] = [{ wch: 10 }, { wch: max_width }];

    writeFile(workbook, `${data.name}.xlsx`, { compression: true })
}
