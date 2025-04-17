'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { fetchKeywords, Keyword } from '@/lib/api/keywords';
import { KeywordTable } from './keyword-table';
import { useEffect, useState } from 'react';
import { useDebounce } from "@uidotdev/usehooks";
import { useRouter, useSearchParams } from 'next/navigation';

export function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const { data: keywordsData } = useQuery({
    queryKey: ['keywords', debouncedSearchTerm],
    queryFn: () => fetchKeywords({
      search: debouncedSearchTerm,
      limit: 20
    }),
  });

  useEffect(() => {
    if (debouncedSearchTerm && debouncedSearchTerm.length) router.push(`/dashboard?search=${debouncedSearchTerm}`);
    else router.push('/dashboard');
  }, [debouncedSearchTerm, router]);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Text Analysis Dashboard</h1>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Keywords</CardTitle>
        </CardHeader>
        <CardContent>
          <KeywordTable
            keywords={keywordsData?.data.keywords ?? ([] as Keyword[])}
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
          ></KeywordTable>
        </CardContent>
      </Card>
    </div>
  );
}
