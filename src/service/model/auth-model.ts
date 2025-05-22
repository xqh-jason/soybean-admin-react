export interface MenuInfo {
  btns: string[];
  child: MenuInfo[];
  id: number;
  key: string;
  name: string;
  parentId: number;
  path: string;
  priority: number;
  type: number;
}
