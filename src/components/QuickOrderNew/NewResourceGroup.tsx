
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ResourceGroupDetailsForm from './ResourceGroupDetails';
import { SideDrawer } from '../Common/SideDrawer';
import AddIcon from '../../assets/images/addIcon.png';

interface NewResourceGroupProps {
  onAddResource: () => void;
}

const NewResourceGroup = ({ onAddResource }: NewResourceGroupProps) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMoreInfoOpen, setMoreInfoOpen] = useState(false);
  const [isBack, setIsBack] = useState(true);

  const handleAddClick = () => {
    setIsDrawerOpen(true);
    onAddResource();
  };

  return (
    <>
      <div className="rounded-lg p-8 flex flex-col items-center justify-center min-h-[500px]">
        <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4">
          {/* <Plus className="w-10 h-10 text-blue-500" /> */}
          <img src={AddIcon} alt='Add' className="w-20 h-20" />
        </div>
        
        <h3 className="text-sm font-semibold text-gray-900 mb-2">
          No Resource Group Have been Added
        </h3>
        
        <p className="text-gray-500 text-center mb-6 text-sm">
          Click the "add" button to create a new resource group.
        </p>
        
        <Button onClick={() => setMoreInfoOpen(true)} className="bg-blue-600 hover:bg-blue-700">
          {/* <Plus className="w-4 h-4 mr-2" /> */}
          Add
        </Button>
      </div>

      <SideDrawer isOpen={isMoreInfoOpen} onClose={() => setMoreInfoOpen(false)} width="100%" title="Resource Group Details" isBack={isBack}>
          <div className="text-sm text-gray-600">
            <ResourceGroupDetailsForm />
          </div>
      </SideDrawer>

      {/* <ResourceGroupDetailsForm /> */}
      {/* <ResourceGroupDetailsForm open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} /> */}
    </>
  );
};

export default NewResourceGroup;
