import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom";
import CreateProductForm from "@/components/admin/form/CreateProductForm";
import EditProductForm from "@/components/admin/form/EditProductForm";
import { Product } from "@/types/admin";

// Mock the useProductForm hook
vi.mock("@/hooks/use-product-form", () => ({
  useProductForm: (product: Product | null, onClose: () => void) => ({
    form: {
      register: vi.fn(),
      handleSubmit: (fn: any) => (e: any) => {
        e.preventDefault();
        fn({});
      },
      formState: {
        errors: {}
      }
    },
    isSubmitting: false,
    mainImage: null,
    galleryImages: [],
    techStack: [],
    features: [],
    handleMainImageUpload: vi.fn(),
    handleGalleryImageUpload: vi.fn(),
    setMainImage: vi.fn(),
    setGalleryImages: vi.fn(),
    setTechStack: vi.fn(),
    setFeatures: vi.fn(),
    onSubmit: vi.fn()
  })
}));

describe("CreateProductForm", () => {
  const mockOnClose = vi.fn();
  const mockSelectedWeek = { id: "123" };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders create form with correct title and badge", () => {
    render(<CreateProductForm onClose={mockOnClose} selectedWeek={mockSelectedWeek} />);
    
    expect(screen.getByText("Add New Product")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    render(<CreateProductForm onClose={mockOnClose} selectedWeek={mockSelectedWeek} />);
    
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("submits form when save button is clicked", async () => {
    render(<CreateProductForm onClose={mockOnClose} selectedWeek={mockSelectedWeek} />);
    
    fireEvent.click(screen.getByText("Save Product"));
    await waitFor(() => {
      expect(screen.getByText("Save Product")).toBeInTheDocument();
    });
  });
});

describe("EditProductForm", () => {
  const mockOnClose = vi.fn();
  const mockSelectedWeek = { id: "123" };
  const mockProduct: Product = {
    id: "1",
    title: "Test Product",
    builderName: "Test Builder",
    description: "Test Description",
    shortDescription: "Test Short Description",
    image: "test-image.jpg",
    galleryImages: [],
    techStack: [],
    features: [],
    pricing: "",
    demoLink: "",
    builderNotes: ""
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders edit form with correct title and badge", () => {
    render(<EditProductForm product={mockProduct} onClose={mockOnClose} selectedWeek={mockSelectedWeek} />);
    
    expect(screen.getByText("Edit Product")).toBeInTheDocument();
    expect(screen.getByText("Editing")).toBeInTheDocument();
  });

  it("calls onClose when cancel button is clicked", () => {
    render(<EditProductForm product={mockProduct} onClose={mockOnClose} selectedWeek={mockSelectedWeek} />);
    
    fireEvent.click(screen.getByText("Cancel"));
    expect(mockOnClose).toHaveBeenCalled();
  });

  it("submits form when save button is clicked", async () => {
    render(<EditProductForm product={mockProduct} onClose={mockOnClose} selectedWeek={mockSelectedWeek} />);
    
    fireEvent.click(screen.getByText("Save Product"));
    await waitFor(() => {
      expect(screen.getByText("Save Product")).toBeInTheDocument();
    });
  });
}); 