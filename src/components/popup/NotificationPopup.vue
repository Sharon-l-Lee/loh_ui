<template>
     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" />
                
                </CardTitle>
                <CardDescription>Alert for informational messages</CardDescription>
            </CardHeader>
            <CardContent>
                <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                    
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        <Info className="h-5 w-5 text-blue-500" />
                        
                    </AlertDialogTitle>
                    <AlertDialogDescription>

                    </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                    </AlertDialogFooter>
                </AlertDialogContent>
                </AlertDialog>
            </CardContent>
        </Card>
    </div>

</template>

<script setup>

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

</script>

<style></style>