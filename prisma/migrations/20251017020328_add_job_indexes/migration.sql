-- CreateIndex
CREATE INDEX "jobs_title_idx" ON "jobs"("title");

-- CreateIndex
CREATE INDEX "jobs_location_idx" ON "jobs"("location");

-- CreateIndex
CREATE INDEX "jobs_type_idx" ON "jobs"("type");

-- CreateIndex
CREATE INDEX "jobs_postedAt_idx" ON "jobs"("postedAt");

-- CreateIndex
CREATE INDEX "jobs_externalId_source_idx" ON "jobs"("externalId", "source");
