import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Star, 
  MessageSquare, 
  ThumbsUp, 
  Flag, 
  Calendar,
  User,
  Heart
} from "lucide-react";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  eventType: string;
  verified: boolean;
  helpful: number;
  vendorResponse?: string;
  responseDate?: string;
}

interface VendorReviewsProps {
  vendorId: string;
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  isVendor?: boolean;
  onReviewResponse?: (reviewId: string, response: string) => void;
}

const VendorReviews = ({ 
  vendorId, 
  reviews, 
  averageRating, 
  totalReviews,
  isVendor = false,
  onReviewResponse 
}: VendorReviewsProps) => {
  const [selectedRating, setSelectedRating] = useState(0);
  const [responseText, setResponseText] = useState("");
  const [activeResponseId, setActiveResponseId] = useState<string | null>(null);

  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleResponseSubmit = (reviewId: string) => {
    if (responseText.trim() && onReviewResponse) {
      onReviewResponse(reviewId, responseText.trim());
      setResponseText("");
      setActiveResponseId(null);
    }
  };

  const getRatingDistribution = () => {
    const distribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="border-rose-gold/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Star className="h-5 w-5 text-rose-gold" />
            <span>Customer Reviews</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Overall Rating */}
            <div className="text-center">
              <div className="text-4xl font-bold text-foreground mb-2">{averageRating.toFixed(1)}</div>
              <div className="flex justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-muted-foreground">Based on {totalReviews} reviews</p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map(rating => {
                const count = ratingDistribution[rating as keyof typeof ratingDistribution];
                const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
                return (
                  <div key={rating} className="flex items-center space-x-2">
                    <span className="text-sm w-3">{rating}</span>
                    <Star className="h-3 w-3 text-yellow-500 fill-current" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-rose-gold/20">
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Review Header */}
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-3">
                    <div className="bg-rose-gold/10 p-2 rounded-full">
                      <User className="h-4 w-4 text-rose-gold" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-semibold text-foreground">{review.customerName}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Verified Customer
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <span>{review.date}</span>
                        <span>•</span>
                        <span>{review.eventType}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center space-x-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {review.helpful} found helpful
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div>
                  <p className="text-foreground leading-relaxed">{review.comment}</p>
                </div>

                {/* Review Actions */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-rose-gold">
                      <ThumbsUp className="h-3 w-3 mr-1" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                      <Flag className="h-3 w-3 mr-1" />
                      Report
                    </Button>
                  </div>

                  {isVendor && !review.vendorResponse && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="border-rose-gold/30 hover:border-rose-gold">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Respond
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Respond to Review</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <Label>Your Response</Label>
                            <Textarea
                              value={responseText}
                              onChange={(e) => setResponseText(e.target.value)}
                              placeholder="Thank the customer and provide any additional information..."
                              className="min-h-[100px]"
                            />
                          </div>
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              onClick={() => setResponseText("")}
                            >
                              Cancel
                            </Button>
                            <Button 
                              variant="hero" 
                              onClick={() => handleResponseSubmit(review.id)}
                              disabled={!responseText.trim()}
                            >
                              Submit Response
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>

                {/* Vendor Response */}
                {review.vendorResponse && (
                  <div className="mt-4 p-4 bg-rose-gold/5 rounded-lg border-l-4 border-rose-gold">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="bg-rose-gold p-1 rounded-full">
                        <Heart className="h-3 w-3 text-white" />
                      </div>
                      <span className="font-semibold text-sm text-foreground">Vendor Response</span>
                      {review.responseDate && (
                        <span className="text-xs text-muted-foreground">• {review.responseDate}</span>
                      )}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{review.vendorResponse}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && (
          <Card className="border-rose-gold/20">
            <CardContent className="p-12 text-center">
              <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                No reviews yet
              </h3>
              <p className="text-muted-foreground">
                Be the first to leave a review for this vendor!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VendorReviews;
