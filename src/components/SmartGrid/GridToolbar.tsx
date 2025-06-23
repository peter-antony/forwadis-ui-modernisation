
import React from 'react';
import { GridColumn } from '../../types/smartGrid';
import { Button } from '../ui/button';
import { Download, Upload, Settings, X } from 'lucide-react';

interface GridToolbarProps<T> {
  selectedCount: number;
  totalCount: number;
  onExport?: () => void;
  onBulkUpload?: (file: File) => void;
  enableExport: boolean;
  enableBulkUpload: boolean;
  onClearSelection: () => void;
  columns: GridColumn<T>[];
  visibleColumns: GridColumn<T>[];
  onColumnVisibilityChange: (columnKey: string, visible: boolean) => void;
  onColumnTitleChange: (columnKey: string, title: string) => void;
  filters: Record<string, any>;
  onFiltersChange: (filters: Record<string, any>) => void;
}

export function GridToolbar<T>({
  selectedCount,
  totalCount,
  onExport,
  onBulkUpload,
  enableExport,
  enableBulkUpload,
  onClearSelection,
  columns,
  visibleColumns,
  onColumnVisibilityChange,
  onColumnTitleChange,
  filters,
  onFiltersChange,
}: GridToolbarProps<T>) {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onBulkUpload) {
      onBulkUpload(file);
    }
  };

  return (
    <div className="flex items-center justify-between mb-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">
          {selectedCount > 0 ? `${selectedCount} selected` : `${totalCount} items`}
        </span>
        
        {selectedCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearSelection}
          >
            <X className="w-4 h-4 mr-2" />
            Clear Selection
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {enableExport && (
          <Button
            variant="outline"
            size="sm"
            onClick={onExport}
          >
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        )}

        {enableBulkUpload && (
          <div>
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileUpload}
              className="hidden"
              id="bulk-upload"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('bulk-upload')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Bulk Upload
            </Button>
          </div>
        )}

        <Button variant="outline" size="sm">
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>
      </div>
    </div>
  );
}
