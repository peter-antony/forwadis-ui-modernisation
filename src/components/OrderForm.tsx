
import React, { useState } from 'react';
import { CalendarIcon, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface OrderFormProps {
  onSaveDraft: () => void;
  onConfirm: () => void;
  onCancel: () => void;
}

const OrderForm = ({ onSaveDraft, onConfirm, onCancel }: OrderFormProps) => {
  const [orderType, setOrderType] = useState('buy');
  const [orderDate, setOrderDate] = useState<Date>();
  const [formData, setFormData] = useState({
    contract: '',
    customer: '',
    cluster: '',
    customerOrderNo: '',
    customerRefNo: '',
    qcUserDefined: '',
    qcValue: '',
    remarks: '',
    summary: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return orderDate && formData.contract && formData.customer;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Details</h2>
      
      <div className="space-y-6">
        {/* Order Type */}
        <div>
          <Label className="text-sm font-medium text-gray-700 mb-3 block">Order Type</Label>
          <RadioGroup
            value={orderType}
            onValueChange={setOrderType}
            className="flex gap-6"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="buy" id="buy" />
              <Label htmlFor="buy">Buy Order</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sell" id="sell" />
              <Label htmlFor="sell">Sell Order</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Order Date */}
          <div>
            <Label htmlFor="order-date" className="text-sm font-medium text-gray-700 mb-2 block">
              Quick Order Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !orderDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {orderDate ? format(orderDate, "dd/MM/yyyy") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={orderDate}
                  onSelect={setOrderDate}
                  initialFocus
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Contract */}
          <div>
            <Label htmlFor="contract" className="text-sm font-medium text-gray-700 mb-2 block">
              Contract
            </Label>
            <Select value={formData.contract} onValueChange={(value) => handleInputChange('contract', value)}>
              <SelectTrigger>
                <SelectValue placeholder="DB Cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="db-cargo">DB Cargo</SelectItem>
                <SelectItem value="rail-freight">Rail Freight</SelectItem>
                <SelectItem value="express-logistics">Express Logistics</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customer */}
          <div>
            <Label htmlFor="customer" className="text-sm font-medium text-gray-700 mb-2 block">
              Customer
            </Label>
            <Select value={formData.customer} onValueChange={(value) => handleInputChange('customer', value)}>
              <SelectTrigger>
                <SelectValue placeholder="DB Cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="db-cargo">DB Cargo</SelectItem>
                <SelectItem value="global-logistics">Global Logistics</SelectItem>
                <SelectItem value="freight-solutions">Freight Solutions</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cluster */}
          <div>
            <Label htmlFor="cluster" className="text-sm font-medium text-gray-700 mb-2 block">
              Cluster
            </Label>
            <Input
              id="cluster"
              placeholder="10000406"
              value={formData.cluster}
              onChange={(e) => handleInputChange('cluster', e.target.value)}
            />
          </div>

          {/* Customer Internal Order No */}
          <div>
            <Label htmlFor="customer-order-no" className="text-sm font-medium text-gray-700 mb-2 block">
              Customer Internal Order No.
            </Label>
            <div className="relative">
              <Input
                id="customer-order-no"
                placeholder="IO/0000000042"
                value={formData.customerOrderNo}
                onChange={(e) => handleInputChange('customerOrderNo', e.target.value)}
                className="pr-10"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Customer/Supplier Ref. No. */}
          <div>
            <Label htmlFor="customer-ref-no" className="text-sm font-medium text-gray-700 mb-2 block">
              Customer/ Supplier Ref. No.
            </Label>
            <Input
              id="customer-ref-no"
              placeholder="Enter Ref. No."
              value={formData.customerRefNo}
              onChange={(e) => handleInputChange('customerRefNo', e.target.value)}
            />
          </div>

          {/* QC Userdefined 1 */}
          <div className="md:col-span-2">
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              QC Userdefined 1
            </Label>
            <div className="flex gap-3">
              <Select value={formData.qcUserDefined} onValueChange={(value) => handleInputChange('qcUserDefined', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="QC" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="qc">QC</SelectItem>
                  <SelectItem value="quality">Quality</SelectItem>
                  <SelectItem value="control">Control</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Enter Value"
                value={formData.qcValue}
                onChange={(e) => handleInputChange('qcValue', e.target.value)}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        {/* Remarks */}
        <div>
          <Label htmlFor="remarks" className="text-sm font-medium text-gray-700 mb-2 block">
            Remarks 1
          </Label>
          <Textarea
            id="remarks"
            placeholder="Enter Remarks"
            value={formData.remarks}
            onChange={(e) => handleInputChange('remarks', e.target.value)}
            rows={3}
          />
        </div>

        {/* Summary */}
        <div>
          <Label htmlFor="summary" className="text-sm font-medium text-gray-700 mb-2 block">
            Summary
          </Label>
          <Textarea
            id="summary"
            placeholder="Enter Summary"
            value={formData.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            rows={3}
          />
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
        <Button
          variant="outline"
          onClick={onCancel}
          className="text-gray-600 hover:text-gray-800"
        >
          Cancel
        </Button>
        <Button
          variant="outline"
          onClick={onSaveDraft}
          className="border-blue-300 text-blue-600 hover:bg-blue-50"
        >
          Save Draft
        </Button>
        <Button
          onClick={onConfirm}
          disabled={!isFormValid()}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300"
        >
          Confirm
        </Button>
      </div>
    </div>
  );
};

export default OrderForm;
