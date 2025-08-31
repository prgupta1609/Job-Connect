import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ApplicationTableView = ({ 
  applications, 
  onWithdraw, 
  onFollowUp, 
  onScheduleInterview,
  onSelectApplication 
}) => {
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'appliedDate', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedApplications(applications?.map(app => app?.id));
    } else {
      setSelectedApplications([]);
    }
  };

  const handleSelectApplication = (applicationId, checked) => {
    if (checked) {
      setSelectedApplications(prev => [...prev, applicationId]);
    } else {
      setSelectedApplications(prev => prev?.filter(id => id !== applicationId));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'submitted':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'under-review':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'shortlisted':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'interview-scheduled':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'offer-received':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig?.key !== key) return 'ArrowUpDown';
    return sortConfig?.direction === 'asc' ? 'ArrowUp' : 'ArrowDown';
  };

  const sortedApplications = [...applications]?.sort((a, b) => {
    if (sortConfig?.key === 'appliedDate') {
      const dateA = new Date(a.appliedDate);
      const dateB = new Date(b.appliedDate);
      return sortConfig?.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    if (sortConfig?.key === 'company') {
      return sortConfig?.direction === 'asc' 
        ? a?.company?.name?.localeCompare(b?.company?.name)
        : b?.company?.name?.localeCompare(a?.company?.name);
    }
    
    if (sortConfig?.key === 'position') {
      return sortConfig?.direction === 'asc' 
        ? a?.position?.localeCompare(b?.position)
        : b?.position?.localeCompare(a?.position);
    }
    
    return 0;
  });

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Bulk Actions */}
      {selectedApplications?.length > 0 && (
        <div className="px-4 py-3 bg-muted border-b border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">
              {selectedApplications?.length} application(s) selected
            </span>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="MessageSquare"
                iconPosition="left"
              >
                Bulk Follow Up
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
              >
                Export Selected
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="px-4 py-3 text-left">
                <Checkbox
                  checked={selectedApplications?.length === applications?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                Company
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('position')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>Position</span>
                  <Icon name={getSortIcon('position')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                <button
                  onClick={() => handleSort('appliedDate')}
                  className="flex items-center space-x-1 hover:text-primary"
                >
                  <span>Applied Date</span>
                  <Icon name={getSortIcon('appliedDate')} size={14} />
                </button>
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground">
                Last Update
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-foreground">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedApplications?.map((application) => (
              <tr 
                key={application?.id} 
                className="hover:bg-muted/50 cursor-pointer"
                onClick={() => onSelectApplication(application)}
              >
                <td className="px-4 py-3">
                  <Checkbox
                    checked={selectedApplications?.includes(application?.id)}
                    onChange={(e) => {
                      e?.stopPropagation();
                      handleSelectApplication(application?.id, e?.target?.checked);
                    }}
                  />
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded overflow-hidden">
                      <Image
                        src={application?.company?.logo}
                        alt={`${application?.company?.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-foreground">
                        {application?.company?.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {application?.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-sm font-medium text-foreground">
                    {application?.position}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {application?.jobType}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(application?.status)}`}>
                    {application?.status?.replace('-', ' ')?.replace(/\b\w/g, l => l?.toUpperCase())}
                  </span>
                  {application?.hasNewUpdate && (
                    <div className="flex items-center mt-1 text-xs text-primary">
                      <Icon name="Bell" size={10} className="mr-1" />
                      New
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {formatDate(application?.appliedDate)}
                </td>
                <td className="px-4 py-3 text-sm text-muted-foreground">
                  {application?.timeline?.[0] && formatDate(application?.timeline?.[0]?.date)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end space-x-1">
                    {['submitted', 'under-review']?.includes(application?.status) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onWithdraw(application?.id);
                        }}
                        iconName="X"
                      />
                    )}
                    
                    {['submitted', 'under-review', 'shortlisted']?.includes(application?.status) && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onFollowUp(application?.id);
                        }}
                        iconName="MessageSquare"
                      />
                    )}
                    
                    {application?.status === 'interview-scheduled' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e?.stopPropagation();
                          onScheduleInterview(application?.id);
                        }}
                        iconName="Calendar"
                      />
                    )}
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="ExternalLink"
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationTableView;