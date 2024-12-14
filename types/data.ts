export interface Classes{
  id: number;
  name: string
  created_at: string
  updated_at: string
}

export interface FullClasses extends Classes{
  parent?: Classes
}
