import React, { useState } from 'react';
import { DynamicPanel } from '@/components/DynamicPanel';
import { PanelVisibilityManager } from '@/components/DynamicPanel/PanelVisibilityManager';
import { PanelConfig, PanelSettings } from '@/types/dynamicPanel';
import { EyeOff } from 'lucide-react';
import { Breadcrumb } from '@/components/Breadcrumb';
import { AppLayout } from '@/components/AppLayout';
import OrderForm from '@/components/OrderForm';
import ResourceGroupPanel from '@/components/ResourceGroupPanel';
import { toast } from 'sonner';


const CreateQuickOrder = () => {
  //BreadCrumb data
  const breadcrumbItems = [
    { label: 'Home', href: '/dashboard', active: false },
    { label: 'Quick Order Management', href: '/quick-order', active: false },
    { label: 'Create Quick Order', active: true }
  ];
  
  const handleSaveDraft = () => {
    toast.success('Order saved as draft successfully!');
    console.log('Save draft clicked');
  };

  const handleConfirm = () => {
    toast.success('Order confirmed successfully!');
    console.log('Confirm order clicked');
  };

  const handleCancel = () => {
    toast.info('Order creation cancelled');
    console.log('Cancel clicked');
  };

  const handleAddResource = () => {
    toast.success('Resource group functionality will be implemented next!');
    console.log('Add resource group clicked');
  };

  return (
    <AppLayout> 
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4 px-6 space-y-6">
        <div className="hidden md:block">
          <Breadcrumb items={breadcrumbItems} />
        </div>
        
        <div className="flex gap-6">
            {/* Left Column - Order Form */}
            <div className="lg:col-span-1 w-2/5">
            <OrderForm
                onSaveDraft={handleSaveDraft}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
            </div>
            
            {/* Right Column - Resource Group Panel */}
            <div className="lg:col-span-1 w-3/5">
            <ResourceGroupPanel onAddResource={handleAddResource} />
            </div>
        </div>

      </div>
    </div>
    </AppLayout>
  );
};

export default CreateQuickOrder;
