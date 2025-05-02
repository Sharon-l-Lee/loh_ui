<template>
    <div class="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div
        class="bg-gray-900 rounded-lg w-full max-w-md relative animate-in fade-in zoom-in duration-300"
      >
        <div class="h-2 bg-purple-600 rounded-t-lg"></div>

        <button
          class="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X class="h-5 w-5" />
        </button>

        <div class="p-6">
          <div class="flex items-center gap-3 mb-6">
            <div class="bg-purple-600/20 p-2 rounded-full">
              <MessageSquare class="h-6 w-6 text-purple-400" />
            </div>
            <h2 class="text-xl font-bold">Contact Us</h2>
          </div>

            <form onSubmit="" class="space-y-4">
              <div class="space-y-2">
                <Label label For="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  class="bg-gray-800 border-gray-700 focus:border-purple-500"
                />
              </div>

              <div class="space-y-2">
                <Label labelFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder=""
                  required
                  class="bg-gray-800 border-gray-700 focus:border-purple-500"
                />
              </div>

              <div class="space-y-2">
                <Label labelFor="subject">Subject</Label>
                <Select onValueChange={handleSelectChange} value={formData.subject}>
                  <SelectTrigger class="bg-gray-800 border-gray-700">
                    <SelectValue placeholder="Select a topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Inquiry</SelectItem>
                    <SelectItem value="support">Technical Support</SelectItem>
                    <SelectItem value="feedback">Feedback</SelectItem>
                    <SelectItem value="bug">Report a Bug</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div class="space-y-2">
                <Label labelFor="message">Message</Label>
              </div>
              <Button
                type="submit"
                class="w-full bg-purple-600 hover:bg-purple-700 text-white"
              ></Button>
            </form>
        </div>
      </div>
    </div>

</template>
<script setup>

import { X, MessageSquare } from 'lucide-vue-next';
</script>