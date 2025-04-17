'use client';

import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Document } from '@/lib/api/documents';
import { Badge } from '@/components/ui/badge';

interface DocumentsListProps {
  documents: Document[];
}

export function DocumentsList({ documents }: DocumentsListProps) {
  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <p className="text-muted-foreground">No documents found</p>
        <p className="text-sm text-muted-foreground">
          Try adjusting your filters to see more results
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className='text-center'>Title</TableHead>
            <TableHead className='text-center'>Content</TableHead>
            <TableHead className='text-center'>Source Id</TableHead>
            <TableHead className='text-center'>Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((document) => (
            <TableRow key={document.id}>
              <TableCell className="font-medium text-center whitespace-normal">{document.title}</TableCell>
              <TableCell className="font-medium text-center whitespace-normal h-auto">
                {document.content}
              </TableCell>
              <TableCell className="text-center">
                <Badge variant="outline">{document.sourceId}</Badge>
              </TableCell>
              <TableCell className="text-center">
                {format(new Date(document.createdAt), 'PPP')}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
