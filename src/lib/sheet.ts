import { ListResponse } from "@/types";
import { utils as xlsx, writeFile } from "xlsx";

export const generateSheet = (data: ListResponse) => {
    const filtered = data.questions.map((r) => {
        return {
            index: r.index,
            difficulty: r.difficulty,
            title: r.title,
            tags: r.topicTags.map((tag) => tag.name).sort().join(", "),
        };
    });

    const worksheet = xlsx.json_to_sheet(filtered);
    const workbook = xlsx.book_new();

    xlsx.book_append_sheet(workbook, worksheet, "Sheet 1");
    xlsx.sheet_add_aoa(
        worksheet,
        [["Index", "Difficulty", "Problems", "Topic Tags"]],
        { origin: "A2" }
    );

    data.questions.forEach((row, index) => {
        worksheet[`C${index + 2}`].l = {
            Target: row.url,
            Tooltip: "Open problem",
        };
    });

    const max_width = filtered.reduce(
        (w, r) => Math.max(w, r.title.length),
        20
    );

    worksheet["!cols"] = [{ wch: 10 }, { wch: max_width }];

    writeFile(workbook, `${data.listMetadata.name}.xlsx`, {
        compression: true,
    });
};
