import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

type ParentElement = Pick<HTMLElement, 'querySelector' | 'querySelectorAll'>;

export function useProTableSizeObserver<T>(
  actionRef: RefObject<T>,
  options?: {
    bottom?: number;
    totalHeight?: string;
    wrapId?: string;
  }
) {
  let { bottom, totalHeight, wrapId } = options ?? {};
  totalHeight ??= '100vh';
  bottom ??= 8;
  const [searchH, setSearchH] = useState<number>(80);

  const getWrapSelector = (selector: string) => (wrapId ? `#${wrapId} .ant-pro-table ${selector}` : selector);

  const querySelector = (selector: string) => {
    let parentElement: ParentElement = document;
    if (wrapId) {
      parentElement = document.getElementById(wrapId) as ParentElement;
    }
    const nodeList = Array.from(parentElement.querySelectorAll<HTMLDivElement>(getWrapSelector(selector)));
    if (nodeList.length > 0) {
      return nodeList[nodeList.length - 1];
    }
    return undefined;
  };

  useEffect(() => {
    if (!actionRef.current) return;

    let observer: ResizeObserver | undefined;
    let tableSearch: HTMLDivElement | undefined;
    let tableHeader: HTMLDivElement | undefined;
    let tableCardBody: HTMLDivElement | undefined;
    setTimeout(() => {
      tableSearch = querySelector('.ant-pro-table-search');
      tableHeader = querySelector('.ant-table-header');
      tableCardBody = querySelector('.ant-pro-card-body')!;

      observer = new ResizeObserver(() => {
        if (tableHeader && tableCardBody) calcTableHeight(tableHeader, tableCardBody);
      });
      if (tableSearch) observer.observe(tableSearch);
      if (tableHeader) observer.observe(tableHeader);
      if (tableCardBody) observer.observe(tableCardBody);
    }, 100);

    if (observer) {
      if (tableSearch) observer.unobserve(tableSearch);
      if (tableHeader) observer.unobserve(tableHeader);
      if (tableCardBody) observer.unobserve(tableCardBody);
    }
  }, [actionRef]);

  function calcTableHeight(tableHeader: HTMLDivElement, tableCardBody: HTMLDivElement) {
    let otherH = 0;

    const { bottom: tableHeaderBottom } = tableHeader.getBoundingClientRect();
    const { paddingBlockEnd } = getComputedStyle(tableCardBody, null);
    otherH = tableHeaderBottom + Number.parseInt(paddingBlockEnd, 10);

    const tablePagination = querySelector('.ant-table-pagination');
    if (tablePagination) {
      otherH += tablePagination?.offsetHeight ?? 24;
      const { marginTop } = getComputedStyle(tablePagination, null);
      otherH += Number.parseInt(marginTop, 10);
    }
    setSearchH(otherH);
  }

  return {
    // 冗余高度: 4px
    tableScrollY: `calc(${totalHeight} - ${bottom}px - ${searchH}px - 4px)`
  };
}
