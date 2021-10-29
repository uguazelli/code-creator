from openpyxl import load_workbook

import pandas


def spreadsheet_to_json(filename):
    result = {}
    wb = load_workbook(filename=filename)

    for sheet in wb:
        m_row = sheet.max_row
        m_col = sheet.max_column
        head = []
        line = []
        for row_index in range(1, m_row + 1):
            details = {}
            for col_index in range(1, m_col + 1):
                cell = sheet.cell(row=row_index, column=col_index).value
                if row_index == 1:
                    head.append(cell or "")
                else:
                    details[head[col_index - 1]] = cell
            if row_index != 1:
                line.append(details)
        result[sheet.title] = line

    return result


def json_to_spreadsheet():
    pass
