

'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { DocumentsList } from '@/components/dashboard/documents-list';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { fetchKeyword } from '@/lib/api/keywords';
import { fetchDocuments } from '@/lib/api/documents';

export default function KeywordPage() {
  const params = useParams();
  const keywordId = Number(params.id);
  const [page, setPage] = useState(1);
  const pageSize = 5; // Number of documents per page

  const { data: keywordResult, isLoading: isLoadingKeyword } = useQuery({
    queryKey: ['keyword', keywordId],
    queryFn: () => fetchKeyword(keywordId),
    enabled: !!keywordId,
  });

  const { data: documentsData, isLoading: isLoadingDocuments } = useQuery({
    queryKey: ['documents', keywordId, page, pageSize],
    queryFn: () => fetchDocuments({ 
      keywordId, 
      skip: (page - 1) * pageSize, 
      limit: pageSize 
    }),
    enabled: !!keywordId,
  });

  const word = keywordResult?.data.word;
  const totalMentions = keywordResult?.data?.frequency ?? 0;
  const positiveMentions = keywordResult?.data.positiveMentions;
  const neutralMentions = keywordResult?.data.neutralMentions;
  const negativeMentions = keywordResult?.data.negativeMentions;
  const documents = documentsData?.data.documents || [];
  const totalDocuments = documentsData?.data.total || 0;
  const totalPages = Math.ceil(totalDocuments / pageSize);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        {isLoadingKeyword ? (
          <Skeleton className="h-10 w-1/3" />
        ) : (
          <h1 className="text-3xl font-bold">{word ?? 'Keyword Details'}</h1>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        <Card>
          <CardHeader>
            <CardTitle>Keyword Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingKeyword ? (
              <div className="space-y-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Frequency</p>
                  <p className="text-2xl font-bold">{totalMentions}</p>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground">Sentiment Distribution</p>
                  <div className="mt-2 flex h-4 w-full overflow-hidden rounded-full bg-muted">
                    {totalMentions > 0 && (
                      <>
                        <div
                          className="bg-green-500 h-full"
                          style={{
                            width: `${(positiveMentions ?? 0) / totalMentions * 100}%`
                          }}
                          title={`Positive: ${positiveMentions ?? 0}`}
                        />
                        <div
                          className="bg-gray-400 h-full"
                          style={{
                            width: `${(neutralMentions ?? 0) / totalMentions * 100}%`
                          }}
                          title={`Neutral: ${neutralMentions ?? 0}`}
                        />
                        <div
                          className="bg-red-500 h-full"
                          style={{
                            width: `${(negativeMentions ?? 0) / totalMentions * 100}%`
                          }}
                          title={`Negative: ${negativeMentions ?? 0}`}
                        />
                      </>
                    )}
                  </div>
                  <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                    <span>+{positiveMentions ?? 0}</span>
                    <span>~{neutralMentions ?? 0}</span>
                    <span>-{negativeMentions ?? 0}</span>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Related Documents</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingDocuments ? (
              <div className="space-y-4">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
              </div>
            ) : (
              <>
                <DocumentsList documents={documents} />
                
                {totalDocuments > 0 && (
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-muted-foreground">
                      Showing {Math.min((page - 1) * pageSize + 1, totalDocuments)} to {Math.min(page * pageSize, totalDocuments)} of {totalDocuments} documents
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePreviousPage}
                        disabled={page === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous page</span>
                      </Button>
                      <div className="text-sm">
                        Page {page} of {totalPages}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextPage}
                        disabled={page === totalPages || totalPages === 0}
                      >
                        <ChevronRight className="h-4 w-4" />
                        <span className="sr-only">Next page</span>
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
