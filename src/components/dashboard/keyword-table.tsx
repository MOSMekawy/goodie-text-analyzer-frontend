'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Keyword } from '@/lib/api/keywords';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import Link from 'next/link';

interface KeywordTableProps {
  keywords: Keyword[];
  searchTerm?: string,
  onSearchTermChange?: (search: string) => void;
}

export function KeywordTable({ keywords, searchTerm, onSearchTermChange }: KeywordTableProps) {

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search keywords..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => onSearchTermChange && onSearchTermChange(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Keyword</TableHead>
              <TableHead className="text-center">Frequency</TableHead>
              <TableHead className="text-center">Sentiment Distribution</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keywords.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="h-24 text-center">
                  No keywords found.
                </TableCell>
              </TableRow>
            ) : (
              keywords.map((keyword) => (
                <TableRow
                  key={keyword.id}
                  className="cursor-pointer hover:bg-muted/50"
                >
                  <TableCell className="text-center font-medium">
                    <Link href={`/keywords/${keyword.id}`} className="w-100 block">
                      {keyword.word}
                    </Link>
                  </TableCell>
                  <TableCell className="text-center">{keyword.frequency}</TableCell>
                  <TableCell>
                    <div className="flex mt-4 h-4 w-full overflow-hidden rounded-full bg-muted">
                      {/* Calculate percentages for sentiment distribution */}
                      {(() => {
                        const total = keyword.positiveMentions + keyword.neutralMentions + keyword.negativeMentions;
                        const positivePercent = total > 0 ? (keyword.positiveMentions / total) * 100 : 0;
                        const neutralPercent = total > 0 ? (keyword.neutralMentions / total) * 100 : 0;
                        const negativePercent = total > 0 ? (keyword.negativeMentions / total) * 100 : 0;

                        return (
                          <>
                            <div
                              className="bg-green-500 h-full"
                              style={{ width: `${positivePercent}%` }}
                              title={`Positive: ${keyword.positiveMentions}`}
                            />
                            <div
                              className="bg-gray-400 h-full"
                              style={{ width: `${neutralPercent}%` }}
                              title={`Neutral: ${keyword.neutralMentions}`}
                            />
                            <div
                              className="bg-red-500 h-full"
                              style={{ width: `${negativePercent}%` }}
                              title={`Negative: ${keyword.negativeMentions}`}
                            />
                          </>
                        );
                      })()}
                    </div>
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>+{keyword.positiveMentions}</span>
                      <span>~{keyword.neutralMentions}</span>
                      <span>-{keyword.negativeMentions}</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
