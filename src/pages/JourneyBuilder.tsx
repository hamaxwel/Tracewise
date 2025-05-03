import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { Plus, Trash2, Save, GripVertical } from 'lucide-react';
import Layout from '../components/Layout/Layout';
import { defaultJourneyStages } from '../utils/mockData';

// This is a simplified version of the Journey Builder
// In a real app, you would need to implement drag-and-drop functionality
// with react-beautiful-dnd or a similar library

const JourneyBuilder: React.FC = () => {
  const [stages, setStages] = useState(defaultJourneyStages.map((stage, index) => ({
    id: `stage-${index}`,
    ...stage,
  })));
  const [saved, setSaved] = useState(false);

  const addStage = () => {
    const newStage = {
      id: `stage-${stages.length}`,
      name: 'New Stage',
      description: 'Description for this stage',
    };
    
    setStages([...stages, newStage]);
  };

  const removeStage = (index: number) => {
    const newStages = [...stages];
    newStages.splice(index, 1);
    setStages(newStages);
  };

  const updateStage = (index: number, field: string, value: string) => {
    const newStages = [...stages];
    newStages[index] = { ...newStages[index], [field]: value };
    setStages(newStages);
  };

  const handleSave = () => {
    // In a real app, you would save the stages to the backend here
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
    }, 3000);
  };

  const handleDragEnd = (result: any) => {
    // Mock function for drag and drop (would use react-beautiful-dnd in real app)
    if (!result.destination) return;
    
    const items = Array.from(stages);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setStages(items);
  };

  return (
    <Layout>
      <div className="animate-fade-in">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Product Journey Builder</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <p className="text-gray-600 mb-4">
            Define the stages that your products go through in the supply chain. Each stage will be recorded on the blockchain when completed.
          </p>
          
          <div className="mb-6">
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="stages">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-4"
                  >
                    {stages.map((stage, index) => (
                      <Draggable key={stage.id} draggableId={stage.id} index={index}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex items-center mb-3">
                              <div {...provided.dragHandleProps} className="mr-2 cursor-grab">
                                <GripVertical className="h-5 w-5 text-gray-400" />
                              </div>
                              <span className="bg-primary-100 text-primary-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Stage {index + 1}
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                              <div>
                                <label htmlFor={`stage-name-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                  Stage Name
                                </label>
                                <input
                                  type="text"
                                  id={`stage-name-${index}`}
                                  value={stage.name}
                                  onChange={(e) => updateStage(index, 'name', e.target.value)}
                                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                              
                              <div>
                                <label htmlFor={`stage-desc-${index}`} className="block text-sm font-medium text-gray-700 mb-1">
                                  Description
                                </label>
                                <input
                                  type="text"
                                  id={`stage-desc-${index}`}
                                  value={stage.description}
                                  onChange={(e) => updateStage(index, 'description', e.target.value)}
                                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                />
                              </div>
                            </div>
                            
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => removeStage(index)}
                                className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-error-700 bg-error-100 hover:bg-error-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-error-500"
                              >
                                <Trash2 className="h-3 w-3 mr-1" />
                                Remove
                              </button>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          </div>
          
          <div className="flex justify-between">
            <button
              type="button"
              onClick={addStage}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Stage
            </button>
            
            <button
              type="button"
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {saved ? (
                <>
                  <svg className="h-4 w-4 mr-1.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-1.5" />
                  Save Journey Template
                </>
              )}
            </button>
          </div>
          
          {saved && (
            <div className="mt-4 rounded-md bg-success-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-success-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-success-800">
                    Journey template saved successfully! You can now assign it to products.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default JourneyBuilder;
