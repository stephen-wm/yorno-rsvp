-- CreateEnum
CREATE TYPE "RSVPStatus" AS ENUM ('PENDING', 'YES', 'NO', 'MAYBE', 'WAITLISTED');

-- CreateEnum
CREATE TYPE "EventRoleType" AS ENUM ('HOST', 'CO_HOST', 'ORGANIZER', 'STAFF');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "location" TEXT,
    "timezone" TEXT,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "ends_at" TIMESTAMP(3),
    "host_id" TEXT NOT NULL,
    "capacity" INTEGER,
    "is_public" BOOLEAN NOT NULL DEFAULT false,
    "status" "EventStatus" NOT NULL DEFAULT 'DRAFT',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invitation" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT,
    "email" TEXT,
    "invited_by" TEXT,
    "token" TEXT,
    "token_expires_at" TIMESTAMP(3),
    "status" "RSVPStatus" NOT NULL DEFAULT 'PENDING',
    "guest_count" INTEGER NOT NULL DEFAULT 0,
    "max_guests" INTEGER NOT NULL DEFAULT 0,
    "responded_at" TIMESTAMP(3),
    "waitlisted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Guest" (
    "id" TEXT NOT NULL,
    "invitation_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CheckIn" (
    "id" TEXT NOT NULL,
    "invitation_id" TEXT NOT NULL,
    "checked_in_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "checked_in_by" TEXT,

    CONSTRAINT "CheckIn_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventRole" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "role" "EventRoleType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventRole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RSVPHistory" (
    "id" TEXT NOT NULL,
    "invitation_id" TEXT NOT NULL,
    "old_status" "RSVPStatus" NOT NULL,
    "new_status" "RSVPStatus" NOT NULL,
    "changed_by" TEXT,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RSVPHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAnnouncement" (
    "id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "author_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventAnnouncement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTag" (
    "event_id" TEXT NOT NULL,
    "tag_id" TEXT NOT NULL,

    CONSTRAINT "EventTag_pkey" PRIMARY KEY ("event_id","tag_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_slug_key" ON "Event"("slug");

-- CreateIndex
CREATE INDEX "Event_host_id_idx" ON "Event"("host_id");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_token_key" ON "Invitation"("token");

-- CreateIndex
CREATE INDEX "Invitation_event_id_idx" ON "Invitation"("event_id");

-- CreateIndex
CREATE INDEX "Invitation_event_id_status_idx" ON "Invitation"("event_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_event_id_email_key" ON "Invitation"("event_id", "email");

-- CreateIndex
CREATE UNIQUE INDEX "Invitation_event_id_user_id_key" ON "Invitation"("event_id", "user_id");

-- CreateIndex
CREATE INDEX "Guest_invitation_id_idx" ON "Guest"("invitation_id");

-- CreateIndex
CREATE UNIQUE INDEX "CheckIn_invitation_id_key" ON "CheckIn"("invitation_id");

-- CreateIndex
CREATE INDEX "CheckIn_invitation_id_idx" ON "CheckIn"("invitation_id");

-- CreateIndex
CREATE INDEX "EventRole_user_id_idx" ON "EventRole"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "EventRole_event_id_user_id_key" ON "EventRole"("event_id", "user_id");

-- CreateIndex
CREATE INDEX "RSVPHistory_invitation_id_idx" ON "RSVPHistory"("invitation_id");

-- CreateIndex
CREATE INDEX "EventAnnouncement_event_id_idx" ON "EventAnnouncement"("event_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Guest" ADD CONSTRAINT "Guest_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CheckIn" ADD CONSTRAINT "CheckIn_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventRole" ADD CONSTRAINT "EventRole_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RSVPHistory" ADD CONSTRAINT "RSVPHistory_invitation_id_fkey" FOREIGN KEY ("invitation_id") REFERENCES "Invitation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAnnouncement" ADD CONSTRAINT "EventAnnouncement_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTag" ADD CONSTRAINT "EventTag_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTag" ADD CONSTRAINT "EventTag_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
