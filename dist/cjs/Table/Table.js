"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Loader_1 = require("../Loader/Loader");
var Table = function (_a) {
    var Rows = _a.Rows, Columns = _a.Columns, loading = _a.loading, handlePagination = _a.handlePagination, hasNextPage = _a.hasNextPage, hasPrevPage = _a.hasPrevPage, pageProp = _a.pageProp, InsertType = _a.InsertType, handleInsert = _a.handleInsert, icon = _a.icon, buttons = _a.buttons;
    var _b = (0, react_1.useState)([]), sortedList = _b[0], setSortedList = _b[1];
    var _c = (0, react_1.useState)(1), page = _c[0], setPage = _c[1];
    var _d = (0, react_1.useState)(false), refresh = _d[0], setRefresh = _d[1];
    var _e = (0, react_1.useState)([]), paginatedData = _e[0], setPaginatedData = _e[1];
    var _f = (0, react_1.useState)(""), search = _f[0], setSearch = _f[1];
    var _g = (0, react_1.useState)(), selectedType = _g[0], setSelectedSearchType = _g[1];
    var _h = (0, react_1.useState)([]), filteredList = _h[0], setFilteredList = _h[1];
    var handleSetPage = handlePagination
        ? function (data) { return handlePagination(data); }
        : function (data) {
            if (data === "neg") {
                if (page <= 1)
                    return;
                setPage(function (prev) { return prev - 1; });
            }
            else {
                if (Rows.length % ((page - 1) * 10) < 10)
                    return;
                setPage(function (prev) { return prev + 1; });
            }
        };
    var handleSort = function (index) {
        var isSorted = true;
        for (var i = 1; i < Rows.length; i++) {
            if (Rows[i]["".concat(Object.keys(Rows[i])[index])] <
                Rows[1 - 1]["".concat(Object.keys(Rows[1 - 1])[index])]) {
                isSorted = false;
                break;
            }
        }
        if (!isSorted) {
            if (isNaN(+Rows[0]["".concat(Object.keys(Rows[0])[index])])) {
                setSortedList(Rows.sort(function (a, b) {
                    if (a["".concat(Object.keys(a)[index])] > b["".concat(Object.keys(b)[index])]) {
                        return 1;
                    }
                    else {
                        return -1;
                    }
                }));
            }
            else {
                setSortedList(Rows.sort(function (a, b) {
                    return +a["".concat(Object.keys(a)[index])] - +b["".concat(Object.keys(b)[index])];
                }));
            }
        }
        else {
            if (isNaN(+Rows[0]["".concat(Object.keys(Rows[0])[index])])) {
                setSortedList(Rows.sort(function (a, b) {
                    if (a["".concat(Object.keys(a)[index])] > b["".concat(Object.keys(b)[index])]) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                }));
            }
            else {
                setSortedList(Rows.sort(function (b, a) {
                    return +a["".concat(Object.keys(a)[index])] - +b["".concat(Object.keys(b)[index])];
                }));
            }
        }
        setRefresh(function (prev) { return !prev; });
    };
    (0, react_1.useEffect)(function () {
        setSortedList(Rows !== null && Rows !== void 0 ? Rows : []);
    }, [Rows]);
    (0, react_1.useEffect)(function () {
        setPaginatedData(handlePagination
            ? __spreadArray([], filteredList, true) : __spreadArray([], filteredList, true).slice((page - 1) * 10, page * 10));
    }, [
        refresh,
        page,
        filteredList,
        Columns,
        search,
        selectedType,
        handlePagination,
    ]);
    var handleSearch = function (e) {
        setSearch(e.target.value);
    };
    var handleSetSelectedSearchType = function (e) {
        setSelectedSearchType(e.target.value);
    };
    (0, react_1.useEffect)(function () {
        setFilteredList(function () {
            return sortedList.filter(function (el) {
                var _a, _b, _c;
                if (typeof el["".concat(Object.keys(el)[Columns.findIndex(function (item) { return item.name === selectedType; }) > -1
                    ? Columns.findIndex(function (item) { return item.name === selectedType; })
                    : 0])] === "object") {
                    return (_c = (_b = (_a = el["".concat(Object.keys(el)[Columns.findIndex(function (item) { return item.name === selectedType; }) > -1
                        ? Columns.findIndex(function (item) { return item.name === selectedType; })
                        : 0])].props) === null || _a === void 0 ? void 0 : _a.children) === null || _b === void 0 ? void 0 : _b.props) === null || _c === void 0 ? void 0 : _c.title.toLowerCase().includes(search.toLowerCase());
                }
                else {
                    return "".concat(el["".concat(Object.keys(el)[Columns.findIndex(function (item) { return item.name === selectedType; }) > -1
                        ? Columns.findIndex(function (item) { return item.name === selectedType; })
                        : 0])])
                        .toLowerCase()
                        .includes(search.toLowerCase());
                }
            });
        });
    }, [Columns, search, selectedType, sortedList, refresh]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "tablewrapper" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "tablewrapper-title" }, { children: [(0, jsx_runtime_1.jsxs)("div", __assign({ className: "tablewrapper-title--search__wrapper" }, { children: [Columns.filter(function (item) { return item.searchable === true; }).length > 0 && ((0, jsx_runtime_1.jsx)("select", __assign({ onChange: function (e) { return handleSetSelectedSearchType(e); }, className: "tablewrapper-title--select" }, { children: Columns.map(function (item) {
                                    var _a;
                                    return (item.searchable && ((0, jsx_runtime_1.jsx)("option", __assign({ value: item.name, className: "tablewrapper-title--select__option" }, { children: (_a = item.name) !== null && _a !== void 0 ? _a : "" }), JSON.stringify(item))));
                                }) }))), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "tablewrapper-title--search" }, { children: [(0, jsx_runtime_1.jsx)("input", { className: "tablewrapper-title--search__input", onChange: function (e) { return handleSearch(e); }, placeholder: "Keywords" }), (0, jsx_runtime_1.jsx)("i", { className: "tablewrapper-title--search__icon fa-light fa-search" })] }))] })), (0, jsx_runtime_1.jsxs)("div", __assign({ className: "tablewrapper-title--insert__wrapper" }, { children: [InsertType && ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "tablewrapper-title--insert", onClick: handleInsert }, { children: [(0, jsx_runtime_1.jsx)("i", __assign({ className: icon ? icon : "fa-light fa-plus" }, { children: " " })), " ", (0, jsx_runtime_1.jsxs)("span", { children: [!icon && "Add", " ", InsertType] })] }))), buttons === null || buttons === void 0 ? void 0 : buttons.map(function (el) { return ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "tablewrapper-title--insert", onClick: el.handle }, { children: [(0, jsx_runtime_1.jsx)("i", __assign({ className: el.icon }, { children: " " })), " ", (0, jsx_runtime_1.jsxs)("span", { children: [" ", el.label] })] }))); })] }))] })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "responsive" }, { children: (0, jsx_runtime_1.jsxs)("table", __assign({ className: "table" }, { children: [(0, jsx_runtime_1.jsx)("thead", __assign({ className: "table-thead" }, { children: (0, jsx_runtime_1.jsx)("tr", __assign({ className: "table-thead--tr" }, { children: Columns.map(function (item, index) { return ((0, jsx_runtime_1.jsxs)("td", __assign({ className: "table-thead--tr__td", style: item.customStyle }, { children: [item.name && item.name, item.action && item.action, item.sortable && ((0, jsx_runtime_1.jsx)("i", { className: "table-thead--tr__td-sort fa-light fa-arrow-down-arrow-up", onClick: function () { return handleSort(index); } }))] }), JSON.stringify(item))); }) })) })), !loading ? ((0, jsx_runtime_1.jsx)("tbody", __assign({ className: "table-tbody" }, { children: paginatedData.length > 0 ? (paginatedData.map(function (item) { return ((0, jsx_runtime_1.jsx)("tr", __assign({ className: "table-tbody--tr" }, { children: Object.values(item).map(function (el) {
                                    return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "table-tbody--tr__td" }, { children: el }), Math.random()));
                                }) }), Math.random())); })) : ((0, jsx_runtime_1.jsx)("tr", __assign({ className: "table-tbody--tr noData" }, { children: (0, jsx_runtime_1.jsx)("td", __assign({ colSpan: Columns.length, className: "table-loading-td" }, { children: "No Data Found" })) }))) }))) : ((0, jsx_runtime_1.jsx)("tbody", { children: (0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsx)("td", __assign({ className: "table-loading-td", colSpan: "100%" }, { children: (0, jsx_runtime_1.jsx)(Loader_1.default, {}) })) }) }))] })) })), (0, jsx_runtime_1.jsx)("div", __assign({ className: "tablewrapper-pagination" }, { children: (0, jsx_runtime_1.jsxs)("div", __assign({ className: "tablewrapper-pagination--main" }, { children: [!handlePagination ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "tablewrapper-pagination--main__left", onClick: function () { return handleSetPage("neg"); } }, { children: (0, jsx_runtime_1.jsx)("i", { className: "tablewrapper-pagination--main__left-icon fa-light fa-chevron-left" }) }))) : hasPrevPage ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "tablewrapper-pagination--main__left", onClick: function () { return handleSetPage("neg"); } }, { children: (0, jsx_runtime_1.jsx)("i", { className: "tablewrapper-pagination--main__left-icon fa-light fa-chevron-left" }) }))) : ((0, jsx_runtime_1.jsx)("div", __assign({ className: "tablewrapper-pagination--main__left-disabled" }, { children: (0, jsx_runtime_1.jsx)("i", { className: "tablewrapper-pagination--main__left-icon fa-light fa-chevron-left" }) }))), (0, jsx_runtime_1.jsx)("div", __assign({ className: "tablewrapper-pagination--main__page" }, { children: handlePagination ? pageProp : page })), !handlePagination ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "tablewrapper-pagination--main__right", onClick: function () { return handleSetPage("pos"); } }, { children: (0, jsx_runtime_1.jsx)("i", { className: "tablewrapper-pagination--main__right-icon fa-light fa-chevron-right" }) }))) : hasNextPage ? ((0, jsx_runtime_1.jsx)("div", __assign({ className: "tablewrapper-pagination--main__right", onClick: function () { return handleSetPage("pos"); } }, { children: (0, jsx_runtime_1.jsx)("i", { className: "tablewrapper-pagination--main__right-icon fa-light fa-chevron-right" }) }))) : ((0, jsx_runtime_1.jsx)("div", __assign({ className: "tablewrapper-pagination--main__right-disabled" }, { children: (0, jsx_runtime_1.jsx)("i", { className: "tablewrapper-pagination--main__right-icon fa-light fa-chevron-right" }) })))] })) }))] })));
};
exports.default = Table;
