
import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Calendar, Edit, AlertTriangle, Eye, Mail, Archive, TrendingUp, X, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductForm from "@/components/admin/ProductForm";
import AdminAuth from "@/components/admin/AdminAuth";
import { useToast } from "@/hooks/use-toast";
import { CURRENT_WEEK, BUILDERS, ProductData } from "@/data/mock-data";

const AdminDashboard = () => {
  // DEVELOPMENT MODE: Default to authenticated
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductData | null>(null);
  const [isEditingWeek, setIsEditingWeek] = useState(false);
  
  const { toast } = useToast();

  // DEVELOPMENT MODE: Skip auth check
  if (!isAuthenticated) {
    return <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  const handleAddProduct = (builderName: string) => {
    setEditingProduct({ builderName } as ProductData);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: ProductData) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };
  
  const handleEndVoting = () => {
    toast({
      title: "Voting ended",
      description: "Voting has been ended for the current week."
    });
  };
  
  const handleCreateNewWeek = () => {
    toast({
      title: "New week created",
      description: "A new week has been created. Please edit the details."
    });
    setIsEditingWeek(true);
  };
  
  const handleEmailSubscribers = () => {
    toast({
      title: "Emails queued",
      description: "Notification emails will be sent to all subscribers."
    });
  };
  
  const handlePublishBattle = () => {
    toast({
      title: "Battle published",
      description: "The current battle is now live on the main site."
    });
  };

  const getSubmissionStatus = (builder: string) => {
    const product = CURRENT_WEEK.products.find(p => p.builderName === builder);
    
    if (!product) {
      return {
        isCreated: false,
        hasGallery: false,
        hasNotes: false,
      };
    }
    
    return {
      isCreated: true,
      hasGallery: product.additionalImages && product.additionalImages.length > 0,
      hasNotes: !!product.builderNotes,
    };
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (isFormOpen) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
        <AdminHeader onLogout={() => setIsAuthenticated(false)} />
        <main className="flex-1 container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductForm 
              product={editingProduct} 
              onClose={handleCloseForm} 
            />
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#1a1f2c] to-[#20143a]">
      <AdminHeader onLogout={() => setIsAuthenticated(false)} />
      
      <main className="flex-1 container mx-auto px-4 py-8 space-y-8">
        {/* Week Manager Panel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="glass-card border-white/10 overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <Badge className="mb-2 bg-sixty40-purple/20 text-sixty40-purple">
                    Week {CURRENT_WEEK.number}
                  </Badge>
                  <CardTitle className="text-2xl md:text-3xl">{CURRENT_WEEK.theme}</CardTitle>
                  <CardDescription className="mt-1">
                    <span className="inline-flex items-center">
                      <Calendar size={14} className="mr-1 text-muted-foreground" />
                      {formatDate(CURRENT_WEEK.startDate)} - {formatDate(CURRENT_WEEK.endDate)}
                    </span>
                    <Badge 
                      className="ml-3 bg-sixty40-blue/20 text-sixty40-blue"
                    >
                      {CURRENT_WEEK.status}
                    </Badge>
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 mt-4 md:mt-0">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/20 hover:bg-white/10"
                  >
                    <Edit size={14} className="mr-1" />
                    Edit Week Details
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-white/20 hover:bg-white/10"
                    onClick={handleEndVoting}
                  >
                    <X size={14} className="mr-1" />
                    End Voting
                  </Button>
                  <Button 
                    size="sm"
                    className="bg-sixty40-purple hover:bg-sixty40-purple/90"
                    onClick={handleCreateNewWeek}
                  >
                    <Plus size={14} className="mr-1" />
                    Create New Week
                  </Button>
                </div>
              </div>
            </CardHeader>
          </Card>
        </motion.section>
        
        {/* Builder Submissions Panel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {BUILDERS.map((builder, index) => {
              const status = getSubmissionStatus(builder.name);
              const product = CURRENT_WEEK.products.find(p => p.builderName === builder.name);
              
              return (
                <Card 
                  key={builder.name}
                  className={`glass-card border-white/10 ${index === 0 ? 'bg-gradient-to-br from-orange-400/5 to-pink-500/5' : 'bg-gradient-to-br from-teal-400/5 to-blue-500/5'}`}
                >
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Badge 
                          className={`mb-2 ${index === 0 ? 'bg-gradient-to-r from-orange-400 to-pink-500' : 'bg-gradient-to-r from-teal-400 to-blue-500'}`}
                        >
                          {builder.name}
                        </Badge>
                        <CardTitle className="text-xl">
                          {product ? product.title : 'No Product Submitted'}
                        </CardTitle>
                      </div>
                      {!product && (
                        <Button
                          size="sm"
                          className="bg-sixty40-purple hover:bg-sixty40-purple/90"
                          onClick={() => handleAddProduct(builder.name)}
                        >
                          <Plus size={14} className="mr-1" />
                          Add Product
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4">
                      {product ? (
                        <div className="w-full md:w-1/3 h-32 rounded-md overflow-hidden bg-black/20">
                          <img 
                            src={product.image} 
                            alt={product.title} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-full md:w-1/3 h-32 rounded-md flex items-center justify-center bg-black/20 border border-white/10">
                          <span className="text-muted-foreground">No image</span>
                        </div>
                      )}
                      
                      <div className="w-full md:w-2/3">
                        <h4 className="text-sm font-medium mb-2">Submission Checklist</h4>
                        <ul className="space-y-2 mb-4">
                          <li className="flex items-center text-sm">
                            {status.isCreated ? (
                              <Check size={16} className="mr-2 text-green-500" />
                            ) : (
                              <X size={16} className="mr-2 text-red-500" />
                            )}
                            Product created
                          </li>
                          <li className="flex items-center text-sm">
                            {status.hasGallery ? (
                              <Check size={16} className="mr-2 text-green-500" />
                            ) : (
                              <X size={16} className="mr-2 text-red-500" />
                            )}
                            Gallery images uploaded
                          </li>
                          <li className="flex items-center text-sm">
                            {status.hasNotes ? (
                              <Check size={16} className="mr-2 text-green-500" />
                            ) : (
                              <X size={16} className="mr-2 text-red-500" />
                            )}
                            Builder notes filled
                          </li>
                        </ul>
                        
                        {product && (
                          <div className="flex items-center gap-2">
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-white/20 hover:bg-white/10"
                            >
                              <Eye size={14} className="mr-1" />
                              Preview
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-sixty40-blue hover:bg-sixty40-blue/90"
                              onClick={() => handleEditProduct(product)}
                            >
                              <Edit size={14} className="mr-1" />
                              Edit Product
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </motion.section>
        
        {/* Admin Actions Panel */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
              <CardDescription>
                Manage the current battle and perform administrative tasks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium flex items-center">
                    <TrendingUp size={16} className="mr-2 text-sixty40-blue" />
                    Current Votes
                  </h4>
                  {CURRENT_WEEK.products.map(product => (
                    <div key={product.id} className="flex justify-between items-center">
                      <span className="text-sm truncate max-w-[180px]">{product.title}</span>
                      <Badge variant="outline" className="bg-white/5">
                        {product.votes} votes
                      </Badge>
                    </div>
                  ))}
                  
                  {CURRENT_WEEK.products.length === 0 && (
                    <div className="text-sm text-muted-foreground">
                      No products submitted yet
                    </div>
                  )}
                </div>
                
                <div className="col-span-2">
                  <div className="flex flex-col space-y-2">
                    <div className="bg-white/5 p-3 rounded-md mb-4">
                      <h4 className="text-sm font-medium mb-2 flex items-center">
                        <AlertTriangle size={16} className="mr-2 text-yellow-500" />
                        Battle Readiness
                      </h4>
                      
                      {CURRENT_WEEK.products.length === 2 ? (
                        <div className="flex items-center">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-sixty40-blue to-sixty40-purple h-2 rounded-full"
                              style={{ width: '100%' }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-green-500">Ready</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="w-full bg-white/10 rounded-full h-2">
                            <div 
                              className="bg-yellow-500 h-2 rounded-full"
                              style={{ width: '50%' }}
                            ></div>
                          </div>
                          <span className="ml-2 text-xs text-yellow-500">Missing products</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant="outline"
                        className="border-white/20 hover:bg-white/10"
                      >
                        <Archive size={16} className="mr-2" />
                        View Past Battles
                      </Button>
                      <Button 
                        variant="outline"
                        className="border-white/20 hover:bg-white/10"
                        onClick={handleEmailSubscribers}
                      >
                        <Mail size={16} className="mr-2" />
                        Email All Subscribers
                      </Button>
                      <Button 
                        className="bg-sixty40-purple hover:bg-sixty40-purple/90"
                        onClick={handlePublishBattle}
                        disabled={CURRENT_WEEK.products.length < 2}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Publish This Battle
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  );
};

export default AdminDashboard;
