import React from 'react';
import { JourneyStage } from '../../types';
import { CheckCircle, Clock, MapPin, User, Hash } from 'lucide-react';

interface JourneyTimelineProps {
  stages: JourneyStage[];
  currentStage: number;
}

const JourneyTimeline: React.FC<JourneyTimelineProps> = ({ stages, currentStage }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {stages.map((stage, stageIdx) => (
          <li key={stage.id}>
            <div className="relative pb-8">
              {stageIdx !== stages.length - 1 ? (
                <span
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
              ) : null}
              <div className="relative flex items-start space-x-3">
                <div>
                  <div className={`relative px-1 ${
                    stageIdx <= currentStage 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  } h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white`}>
                    <CheckCircle className="h-5 w-5" aria-hidden="true" />
                  </div>
                </div>
                <div className="min-w-0 flex-1 py-0">
                  <div className="bg-white p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
                    <div className="text-sm font-medium text-gray-900">
                      {stage.name}
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {stage.description}
                    </p>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                        {formatDate(stage.timestamp)}
                      </div>
                      
                      {stage.location && (
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {stage.location}
                        </div>
                      )}
                      
                      {stage.completedBy && (
                        <div className="flex items-center text-sm text-gray-500">
                          <User className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          {stage.completedBy}
                        </div>
                      )}
                      
                      {stage.transactionHash && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Hash className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                          <a
                            href={`https://polygonscan.com/tx/${stage.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent-500 hover:text-accent-600 truncate"
                          >
                            {stage.transactionHash.substring(0, 10)}...{stage.transactionHash.substring(stage.transactionHash.length - 8)}
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JourneyTimeline;