
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { SmartGridProps, GridPreferences, GridState, GridColumn } from '../../types/smartGrid';
import { GridHeader } from './GridHeader';
import { GridBody } from './GridBody';
import { GridPagination } from './GridPagination';
import { GridToolbar } from './GridToolbar';
import { useGridPreferences } from './hooks/useGridPreferences';
import { useGridData } from './hooks/useGridData';
import { useGridSelection } from './hooks/useGridSelection';

export function SmartGrid<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  error = null,
  selectedRows = [],
  onRowSelectionChange,
  rowKey = 'id',
  pagination = true,
  infiniteScroll = false,
  pageSize = 10,
  totalCount,
  onPageChange,
  defaultSort,
  defaultFilters = {},
  onSort,
  onFilter,
  onCellEdit,
  onRowUpdate,
  onDataFetch,
  onUpdate,
  onBulkUpdate,
  enableExport = true,
  enableBulkUpload = true,
  onExport,
  onBulkUpload,
  storageKey = 'smart-grid-preferences',
  savePreferences,
  loadPreferences,
  nestedRows = false,
  mobileBreakpoint = 'md',
  className = '',
}: SmartGridProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editingCell, setEditingCell] = useState<{ row: string; column: string } | null>(null);
  
  const {
    preferences,
    updatePreferences,
    resetPreferences,
  } = useGridPreferences({
    columns,
    defaultSort,
    defaultFilters,
    pageSize,
    storageKey,
    savePreferences,
    loadPreferences,
  });

  const {
    processedData,
    sortData,
    filterData,
    updateSort,
    updateFilters,
  } = useGridData({
    data,
    preferences,
    currentPage,
    onSort,
    onFilter,
  });

  const {
    selection,
    handleSelectAll,
    handleSelectRow,
    clearSelection,
  } = useGridSelection({
    data: processedData.paginatedData,
    selectedRows,
    onRowSelectionChange,
    rowKey,
  });

  const getRowKey = useCallback((record: T): string => {
    if (typeof rowKey === 'function') {
      return rowKey(record);
    }
    return String(record[rowKey]);
  }, [rowKey]);

  const handleColumnReorder = useCallback((draggedId: string, targetId: string) => {
    const newOrder = [...preferences.columnOrder];
    const draggedIndex = newOrder.indexOf(draggedId);
    const targetIndex = newOrder.indexOf(targetId);
    
    newOrder.splice(draggedIndex, 1);
    newOrder.splice(targetIndex, 0, draggedId);
    
    updatePreferences({ columnOrder: newOrder });
  }, [preferences.columnOrder, updatePreferences]);

  const handleColumnVisibilityChange = useCallback((columnKey: string, visible: boolean) => {
    const hiddenColumns = visible
      ? preferences.hiddenColumns.filter(col => col !== columnKey)
      : [...preferences.hiddenColumns, columnKey];
    
    updatePreferences({ hiddenColumns });
  }, [preferences.hiddenColumns, updatePreferences]);

  const handleColumnTitleChange = useCallback((columnKey: string, title: string) => {
    updatePreferences({
      columnTitles: { ...preferences.columnTitles, [columnKey]: title }
    });
  }, [preferences.columnTitles, updatePreferences]);

  const handleCellEdit = useCallback((rowKey: string, columnKey: string, value: any) => {
    setEditingCell(null);
    onCellEdit?.(rowKey, columnKey, value);
  }, [onCellEdit]);

  const visibleColumns = useMemo(() => {
    return preferences.columnOrder
      .map(key => columns.find(col => String(col.key) === key))
      .filter((col): col is GridColumn<T> => 
        col !== undefined && !preferences.hiddenColumns.includes(String(col.key))
      );
  }, [columns, preferences.columnOrder, preferences.hiddenColumns]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="text-red-800">{error}</div>
      </div>
    );
  }

  return (
    <div className={`smart-grid ${className}`}>
      <GridToolbar
        selectedCount={selection.selectedRows.length}
        totalCount={processedData.filteredData.length}
        onExport={onExport}
        onBulkUpload={onBulkUpload}
        enableExport={enableExport}
        enableBulkUpload={enableBulkUpload}
        onClearSelection={clearSelection}
        columns={columns}
        visibleColumns={visibleColumns}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        onColumnTitleChange={handleColumnTitleChange}
        filters={preferences.filters}
        onFiltersChange={updateFilters}
      />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <GridHeader
              columns={visibleColumns}
              preferences={preferences}
              onSort={updateSort}
              onColumnReorder={handleColumnReorder}
              onSelectAll={handleSelectAll}
              selectedAll={selection.selectedAll}
              indeterminate={selection.indeterminate}
            />
            <GridBody
              data={processedData.paginatedData}
              columns={visibleColumns}
              getRowKey={getRowKey}
              selectedRows={selection.selectedRows}
              onSelectRow={handleSelectRow}
              editingCell={editingCell}
              onCellEdit={handleCellEdit}
              onEditStart={setEditingCell}
              nestedRows={nestedRows}
              mobileBreakpoint={mobileBreakpoint}
            />
          </table>
        </div>

        {pagination && !infiniteScroll && (
          <GridPagination
            currentPage={currentPage}
            pageSize={preferences.pageSize}
            totalCount={totalCount || processedData.filteredData.length}
            onPageChange={(page, size) => {
              setCurrentPage(page);
              if (size !== preferences.pageSize) {
                updatePreferences({ pageSize: size });
              }
              onPageChange?.(page, size);
            }}
          />
        )}
      </div>
    </div>
  );
}
