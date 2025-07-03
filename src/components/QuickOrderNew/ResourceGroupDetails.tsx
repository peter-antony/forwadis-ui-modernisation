
import React, { useState } from 'react';
import { X, Search, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { DynamicPanel } from '@/components/DynamicPanel';
import { PanelConfig, PanelSettings } from '@/types/dynamicPanel';


interface ResourceGroupDetailsProps {
  open: boolean;
  onClose: () => void;
}

const ResourceGroupDetails = ({ open, onClose }: ResourceGroupDetailsProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  const handleProceedToNext = () => {
    setCurrentStep(2);
  };

  const handleSaveDetails = () => {
    console.log('Save details clicked');
  };

  const [basicDetailsData, setBasicDetailsData] = useState({});
  const [operationalDetailsData, setOperationalDetailsData] = useState({});
  const [billingDetailsData, setBillingDetailsData] = useState({});

  // Panel titles state
  const [basicDetailsTitle, setBasicDetailsTitle] = useState('Basic Details');
  const [operationalDetailsTitle, setOperationalDetailsTitle] = useState('Operational Details');
  const [billingDetailsTitle, setBillingDetailsTitle] = useState('Billing Details');

  // Panel widths state - updated for 12-column system
  // const [basicDetailsWidth, setBasicDetailsWidth] = useState<'full' | 'half' | 'third' | 'quarter' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>(12);
  // const [operationalDetailsWidth, setOperationalDetailsWidth] = useState<'full' | 'half' | 'third' | 'quarter' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>(6);
  // const [billingDetailsWidth, setBillingDetailsWidth] = useState<'full' | 'half' | 'third' | 'quarter' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12>(6);

  // Panel visibility state
  const [basicDetailsVisible, setBasicDetailsVisible] = useState(true);
  const [operationalDetailsVisible, setOperationalDetailsVisible] = useState(true);
  const [billingDetailsVisible, setBillingDetailsVisible] = useState(true);

  // Basic Details Panel Configuration
  const basicDetailsConfig: PanelConfig = {
    tripPlanNo: {
      id: 'tripPlanNo',
      label: 'Trip Plan No',
      fieldType: 'text',
      value: 'TRIP00000001',
      mandatory: true,
      visible: true,
      editable: false,
      order: 1
    },
    customerName: {
      id: 'customerName',
      label: 'Customer Name',
      fieldType: 'select',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 2,
      options: [
        { label: 'DB Cargo', value: 'db-cargo' },
        { label: 'ABC Rail Goods', value: 'abc-rail' },
        { label: 'Wave Cargo', value: 'wave-cargo' }
      ]
    },
    contractType: {
      id: 'contractType',
      label: 'Contract Type',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 3,
      options: [
        { label: 'Fixed Price', value: 'fixed' },
        { label: 'Variable', value: 'variable' },
        { label: 'Cost Plus', value: 'cost-plus' }
      ]
    },
    description: {
      id: 'description',
      label: 'Description',
      fieldType: 'textarea',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 4,
      placeholder: 'Enter trip description...'
    },
    priority: {
      id: 'priority',
      label: 'Priority',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 5,
      options: [
        { label: 'High', value: 'high' },
        { label: 'Medium', value: 'medium' },
        { label: 'Low', value: 'low' }
      ]
    }
  };

  // Operational Details Panel Configuration
  const operationalDetailsConfig: PanelConfig = {
    plannedStartDate: {
      id: 'plannedStartDate',
      label: 'Planned Start Date',
      fieldType: 'date',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 1
    },
    plannedStartTime: {
      id: 'plannedStartTime',
      label: 'Planned Start Time',
      fieldType: 'time',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 2
    },
    plannedEndDate: {
      id: 'plannedEndDate',
      label: 'Planned End Date',
      fieldType: 'date',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 3
    },
    plannedEndTime: {
      id: 'plannedEndTime',
      label: 'Planned End Time',
      fieldType: 'time',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 4
    },
    departurePoint: {
      id: 'departurePoint',
      label: 'Departure Point',
      fieldType: 'search',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 5,
      placeholder: 'Search departure location...'
    },
    arrivalPoint: {
      id: 'arrivalPoint',
      label: 'Arrival Point',
      fieldType: 'search',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 6,
      placeholder: 'Search arrival location...'
    },
    distance: {
      id: 'distance',
      label: 'Distance (km)',
      fieldType: 'text',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 7
    },
    trainType: {
      id: 'trainType',
      label: 'Train Type',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 8,
      options: [
        { label: 'Freight', value: 'freight' },
        { label: 'Passenger', value: 'passenger' },
        { label: 'Mixed', value: 'mixed' }
      ]
    }
  };

  // Billing Details Panel Configuration
  const billingDetailsConfig: PanelConfig = {
    totalAmount: {
      id: 'totalAmount',
      label: 'Total Amount',
      fieldType: 'currency',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 1
    },
    taxAmount: {
      id: 'taxAmount',
      label: 'Tax Amount',
      fieldType: 'currency',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 2
    },
    discountAmount: {
      id: 'discountAmount',
      label: 'Discount Amount',
      fieldType: 'currency',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 3
    },
    billingStatus: {
      id: 'billingStatus',
      label: 'Billing Status',
      fieldType: 'select',
      value: '',
      mandatory: true,
      visible: true,
      editable: true,
      order: 4,
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Pending', value: 'pending' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' }
      ]
    },
    paymentTerms: {
      id: 'paymentTerms',
      label: 'Payment Terms',
      fieldType: 'select',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 5,
      options: [
        { label: 'Net 30', value: 'net-30' },
        { label: 'Net 60', value: 'net-60' },
        { label: 'Due on Receipt', value: 'due-on-receipt' }
      ]
    },
    invoiceDate: {
      id: 'invoiceDate',
      label: 'Invoice Date',
      fieldType: 'date',
      value: '',
      mandatory: false,
      visible: true,
      editable: true,
      order: 6
    }
  };

  // Mock functions for user config management
  const getUserPanelConfig = (userId: string, panelId: string): PanelSettings | null => {
    const stored = localStorage.getItem(`panel-config-${userId}-${panelId}`);
    return stored ? JSON.parse(stored) : null;
  };

  const saveUserPanelConfig = (userId: string, panelId: string, settings: PanelSettings): void => {
    localStorage.setItem(`panel-config-${userId}-${panelId}`, JSON.stringify(settings));
    console.log(`Saved config for panel ${panelId}:`, settings);
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full p-0" side="right">
        <div className="w-full border-b bg-white">
          <div className="flex items-center justify-between px-3">
            <h1 className="text-lg font-semibold">Resource Group Details</h1>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
        <div className="flex h-full">
          {/* Left Side - Stepper and Main Content */}
          <div className="flex-1 flex">
            {/* Vertical Stepper */}
            <div className="w-64 p-6 border-r">
              <div className="space-y-6">
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === 1 ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'
                  }`}>
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-medium ${currentStep === 1 ? 'text-blue-600' : 'text-gray-900'}`}>
                      Resource Group Creation
                    </h3>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-sm font-medium ${currentStep === 2 ? 'text-blue-600' : 'text-gray-500'}`}>
                      Plan and Actuals
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">Total Items: 0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-gray-50 p-6 overflow-y-auto">
              <SheetHeader className="mb-6">
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-lg font-semibold">Resource Group Creation</SheetTitle>
                </div>
              </SheetHeader>

              {currentStep === 1 && (
                <div className="space-y-8">
                  {/* Basic Details Section */}
                  {/* <div className="grid grid-cols-12 gap-6"> */}
                  <div className="flex gap-6">
                    <div className="w-3/5">
                      {basicDetailsVisible && (
                        <DynamicPanel
                          panelId="basic-details"
                          panelTitle={basicDetailsTitle}
                          panelConfig={basicDetailsConfig}
                          initialData={basicDetailsData}
                          onDataChange={setBasicDetailsData}
                          onTitleChange={setBasicDetailsTitle}
                          // onWidthChange={setBasicDetailsWidth}
                          getUserPanelConfig={getUserPanelConfig}
                          saveUserPanelConfig={saveUserPanelConfig}
                          userId="current-user"
                          // panelWidth={basicDetailsWidth}
                        />
                      )}

                      {operationalDetailsVisible && (
                        <DynamicPanel
                          panelId="operational-details"
                          panelTitle={operationalDetailsTitle}
                          panelConfig={operationalDetailsConfig}
                          initialData={operationalDetailsData}
                          onDataChange={setOperationalDetailsData}
                          onTitleChange={setOperationalDetailsTitle}
                          // onWidthChange={setOperationalDetailsWidth}
                          getUserPanelConfig={getUserPanelConfig}
                          saveUserPanelConfig={saveUserPanelConfig}
                          userId="current-user"
                          // panelWidth={operationalDetailsWidth}
                        />
                      )}
                    </div>
                    
                    <div className="w-2/5">
                      {billingDetailsVisible && (
                        <DynamicPanel
                          panelId="billing-details"
                          panelTitle={billingDetailsTitle}
                          panelConfig={billingDetailsConfig}
                          initialData={billingDetailsData}
                          onDataChange={setBillingDetailsData}
                          onTitleChange={setBillingDetailsTitle}
                          // onWidthChange={setBasicDetailsWidth}
                          getUserPanelConfig={getUserPanelConfig}
                          saveUserPanelConfig={saveUserPanelConfig}
                          userId="current-user"
                          // panelWidth={billingDetailsWidth}
                        />
                      )}
                    </div>
                    
                  </div>

                </div>
              )}

              {currentStep === 2 && (
                <div className="flex items-center justify-center h-64">
                  <p className="text-gray-500">Plan and Actuals content will be implemented here</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-8 flex justify-end space-x-3">
                {currentStep === 1 && (
                  <Button onClick={handleProceedToNext} className="bg-blue-600 hover:bg-blue-700">
                    Proceed to Next
                  </Button>
                )}
                <Button variant="outline" onClick={handleSaveDetails} className="border-blue-600 text-blue-600 hover:bg-blue-50">
                  Save Details
                </Button>
              </div>
            </div>
          </div>

         
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResourceGroupDetails;
