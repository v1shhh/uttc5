export interface Lead {
  id?: number;
  created_at?: string;
  name: string;
  company?: string;
  email: string;
  phone?: string;
  service_type?: string;
  project_type?: string;
  budget_range?: string;
  timeline?: string;
  message?: string;
  source_page?: string;
  source_utm?: string;
  lead_score?: number;
  status: 'new' | 'contacted' | 'qualified' | 'won' | 'lost' | 'deleted';
  notes?: string;
}
