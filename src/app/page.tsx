'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to chat page (main interface)
    // TODO: Later redirect to login/onboarding if not authenticated
    router.push('/chat');
  }, [router]);

  return null;
}
