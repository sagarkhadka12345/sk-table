import React, { useEffect, useState } from "react";
import Loading from "../Loader/Loader";
export type ColumnType = {
  name: string;
  sortable?: boolean;
  searchable?: boolean;
  customStyle?: Record<any, string>;
  action?: string;
};
const Table = ({
  Rows,
  Columns,
  loading,
  handlePagination,
  hasNextPage,
  hasPrevPage,
  pageProp,
  InsertType,
  handleInsert,
  icon,
  buttons,
}: {
  Rows: any[];
  Columns: ColumnType[];
  loading: boolean;
  handlePagination?: ((data: "pos" | "neg") => void) | undefined;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  pageProp?: number;
  InsertType?: string;
  handleInsert?: () => void;
  icon?: string;
  buttons?: Array<{ icon: string; handle: () => void; label: string }>;
}) => {
  const [sortedList, setSortedList] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const [paginatedData, setPaginatedData] = useState<Record<any, any>[]>([]);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedSearchType] = useState<string>();
  const [filteredList, setFilteredList] = useState<any[]>([]);
  const handleSetPage = handlePagination
    ? (data: "neg" | "pos") => handlePagination(data)
    : (data: "neg" | "pos") => {
        if (data === "neg") {
          if (page <= 1) return;
          setPage((prev) => prev - 1);
        } else {
          if (Rows.length % ((page - 1) * 10) < 10) return;
          setPage((prev) => prev + 1);
        }
      };
  const handleSort = (index: number) => {
    let isSorted = true;
    for (let i = 1; i < Rows.length; i++) {
      if (
        Rows[i][`${Object.keys(Rows[i])[index]}`] <
        Rows[1 - 1][`${Object.keys(Rows[1 - 1])[index]}`]
      ) {
        isSorted = false;
        break;
      }
    }

    if (!isSorted) {
      if (isNaN(+Rows[0][`${Object.keys(Rows[0])[index]}`])) {
        setSortedList(
          Rows.sort((a, b) => {
            if (a[`${Object.keys(a)[index]}`] > b[`${Object.keys(b)[index]}`]) {
              return 1;
            } else {
              return -1;
            }
          })
        );
      } else {
        setSortedList(
          Rows.sort(
            (a, b) =>
              +a[`${Object.keys(a)[index]}`] - +b[`${Object.keys(b)[index]}`]
          )
        );
      }
    } else {
      if (isNaN(+Rows[0][`${Object.keys(Rows[0])[index]}`])) {
        setSortedList(
          Rows.sort((a, b) => {
            if (a[`${Object.keys(a)[index]}`] > b[`${Object.keys(b)[index]}`]) {
              return -1;
            } else {
              return 1;
            }
          })
        );
      } else {
        setSortedList(
          Rows.sort(
            (b, a) =>
              +a[`${Object.keys(a)[index]}`] - +b[`${Object.keys(b)[index]}`]
          )
        );
      }
    }

    setRefresh((prev) => !prev);
  };
  useEffect(() => {
    setSortedList(Rows ?? []);
  }, [Rows]);
  useEffect(() => {
    setPaginatedData(
      handlePagination
        ? [...filteredList]
        : [...filteredList].slice((page - 1) * 10, page * 10)
    );
  }, [
    refresh,
    page,
    filteredList,
    Columns,
    search,
    selectedType,
    handlePagination,
  ]);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleSetSelectedSearchType = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSearchType(e.target.value);
  };
  useEffect(() => {
    setFilteredList(() =>
      sortedList.filter((el) => {
        if (
          typeof el[
            `${
              Object.keys(el)[
                Columns.findIndex((item) => item.name === selectedType) > -1
                  ? Columns.findIndex((item) => item.name === selectedType)
                  : 0
              ]
            }`
          ] === "object"
        ) {
          return el[
            `${
              Object.keys(el)[
                Columns.findIndex((item) => item.name === selectedType) > -1
                  ? Columns.findIndex((item) => item.name === selectedType)
                  : 0
              ]
            }`
          ].props?.children?.props?.title
            .toLowerCase()
            .includes(search.toLowerCase());
        } else {
          return `${
            el[
              `${
                Object.keys(el)[
                  Columns.findIndex((item) => item.name === selectedType) > -1
                    ? Columns.findIndex((item) => item.name === selectedType)
                    : 0
                ]
              }`
            ]
          }`
            .toLowerCase()
            .includes(search.toLowerCase());
        }
      })
    );
  }, [Columns, search, selectedType, sortedList, refresh]);

  return (
    <div className="tablewrapper">
      <div className="tablewrapper-title">
        <div className="tablewrapper-title--search__wrapper">
          {Columns.filter((item) => item.searchable === true).length > 0 && (
            <select
              onChange={(e) => handleSetSelectedSearchType(e)}
              className="tablewrapper-title--select"
            >
              {Columns.map((item) => {
                return (
                  item.searchable && (
                    <option
                      value={item.name}
                      className="tablewrapper-title--select__option"
                      key={JSON.stringify(item)}
                    >
                      {item.name ?? ""}
                    </option>
                  )
                );
              })}
            </select>
          )}
          <div className="tablewrapper-title--search">
            <input
              className="tablewrapper-title--search__input"
              onChange={(e) => handleSearch(e)}
              placeholder="Keywords"
            />
            <i className="tablewrapper-title--search__icon fa-light fa-search" />
          </div>
        </div>
        <div className="tablewrapper-title--insert__wrapper">
          {InsertType && (
            <div className="tablewrapper-title--insert" onClick={handleInsert}>
              <i className={icon ? icon : "fa-light fa-plus"}> </i>{" "}
              <span>
                {!icon && "Add"} {InsertType}
              </span>
            </div>
          )}
          {buttons?.map((el) => (
            <div className="tablewrapper-title--insert" onClick={el.handle}>
              <i className={el.icon}> </i> <span> {el.label}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="responsive">
        <table className="table">
          <thead className="table-thead">
            <tr className="table-thead--tr">
              {Columns.map((item, index) => (
                <td
                  className="table-thead--tr__td"
                  key={JSON.stringify(item)}
                  style={item.customStyle}
                >
                  {item.name && item.name}
                  {item.action && item.action}
                  {item.sortable && (
                    <i
                      className="table-thead--tr__td-sort fa-light fa-arrow-down-arrow-up"
                      onClick={() => handleSort(index)}
                    ></i>
                  )}
                </td>
              ))}
            </tr>
          </thead>
          {!loading ? (
            <tbody className="table-tbody">
              {paginatedData.length > 0 ? (
                paginatedData.map((item) => (
                  <tr className="table-tbody--tr" key={Math.random()}>
                    {Object.values(item).map((el: string) => {
                      return (
                        <td key={Math.random()} className="table-tbody--tr__td">
                          {el}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr className="table-tbody--tr noData">
                  <td colSpan={Columns.length} className="table-loading-td">
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td
                  className="table-loading-td"
                  colSpan={"100%" as unknown as number}
                >
                  <Loading />
                </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <div className="tablewrapper-pagination">
        <div className="tablewrapper-pagination--main">
          {!handlePagination ? (
            <div
              className="tablewrapper-pagination--main__left"
              onClick={() => handleSetPage("neg")}
            >
              <i className="tablewrapper-pagination--main__left-icon fa-light fa-chevron-left" />
            </div>
          ) : hasPrevPage ? (
            <div
              className="tablewrapper-pagination--main__left"
              onClick={() => handleSetPage("neg")}
            >
              <i className="tablewrapper-pagination--main__left-icon fa-light fa-chevron-left" />
            </div>
          ) : (
            <div className="tablewrapper-pagination--main__left-disabled">
              <i className="tablewrapper-pagination--main__left-icon fa-light fa-chevron-left" />
            </div>
          )}
          <div className="tablewrapper-pagination--main__page">
            {handlePagination ? pageProp : page}
          </div>
          {!handlePagination ? (
            <div
              className="tablewrapper-pagination--main__right"
              onClick={() => handleSetPage("pos")}
            >
              <i className="tablewrapper-pagination--main__right-icon fa-light fa-chevron-right" />
            </div>
          ) : hasNextPage ? (
            <div
              className="tablewrapper-pagination--main__right"
              onClick={() => handleSetPage("pos")}
            >
              <i className="tablewrapper-pagination--main__right-icon fa-light fa-chevron-right" />
            </div>
          ) : (
            <div className="tablewrapper-pagination--main__right-disabled">
              <i className="tablewrapper-pagination--main__right-icon fa-light fa-chevron-right" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Table;
