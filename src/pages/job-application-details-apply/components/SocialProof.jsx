import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const SocialProof = ({ applicationCount, employeeReviews, companyRating }) => {
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars?.push(
        <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
      );
    }
    
    if (hasHalfStar) {
      stars?.push(
        <Icon key="half" name="Star" size={14} className="text-warning fill-current opacity-50" />
      );
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars?.push(
        <Icon key={`empty-${i}`} name="Star" size={14} className="text-muted-foreground" />
      );
    }
    
    return stars;
  };

  return (
    <div className="space-y-4">
      {/* Application Stats */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Users" size={16} className="text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Application Activity</h4>
            <p className="text-xs text-muted-foreground">Recent interest in this position</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Total Applications</span>
            <span className="font-semibold text-foreground">{applicationCount}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Applied Today</span>
            <span className="font-semibold text-foreground">{Math.floor(applicationCount * 0.1)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Views This Week</span>
            <span className="font-semibold text-foreground">{Math.floor(applicationCount * 2.5)}</span>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Icon name="TrendingUp" size={12} className="text-success" />
            <span>High interest position - Apply soon!</span>
          </div>
        </div>
      </div>
      {/* Company Rating */}
      {companyRating && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 bg-warning/10 rounded-full flex items-center justify-center">
              <Icon name="Star" size={16} className="text-warning" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Company Rating</h4>
              <p className="text-xs text-muted-foreground">Based on employee reviews</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {renderStars(companyRating?.overall)}
            </div>
            <span className="font-semibold text-foreground">{companyRating?.overall}</span>
            <span className="text-sm text-muted-foreground">
              ({companyRating?.reviewCount} reviews)
            </span>
          </div>
          
          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Work-Life Balance</span>
              <div className="flex items-center gap-1">
                {renderStars(companyRating?.workLife)}
                <span className="text-foreground ml-1">{companyRating?.workLife}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Career Growth</span>
              <div className="flex items-center gap-1">
                {renderStars(companyRating?.career)}
                <span className="text-foreground ml-1">{companyRating?.career}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Compensation</span>
              <div className="flex items-center gap-1">
                {renderStars(companyRating?.compensation)}
                <span className="text-foreground ml-1">{companyRating?.compensation}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Employee Reviews */}
      {employeeReviews && employeeReviews?.length > 0 && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-success/10 rounded-full flex items-center justify-center">
              <Icon name="MessageSquare" size={16} className="text-success" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground">Employee Reviews</h4>
              <p className="text-xs text-muted-foreground">What employees are saying</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {employeeReviews?.slice(0, 2)?.map((review, index) => (
              <div key={index} className="border-l-2 border-primary/20 pl-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-muted">
                    <Image
                      src={review?.avatar}
                      alt="Employee"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    {renderStars(review?.rating)}
                  </div>
                  <span className="text-xs text-muted-foreground">{review?.date}</span>
                </div>
                
                <p className="text-sm text-foreground mb-2 line-clamp-3">
                  "{review?.comment}"
                </p>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>{review?.position}</span>
                  <span>•</span>
                  <span>{review?.department}</span>
                  {review?.verified && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Icon name="BadgeCheck" size={12} className="text-success" />
                        <span>Verified</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {employeeReviews?.length > 2 && (
            <div className="mt-4 pt-3 border-t border-border">
              <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
                View all {employeeReviews?.length} reviews
              </button>
            </div>
          )}
        </div>
      )}
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
            <Icon name="Activity" size={16} className="text-muted-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Recent Activity</h4>
            <p className="text-xs text-muted-foreground">Live application updates</p>
          </div>
        </div>
        
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-success rounded-full" />
            <span>3 applications submitted in the last hour</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full" />
            <span>12 candidates viewed this job today</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-warning rounded-full" />
            <span>Company actively reviewing applications</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProof;