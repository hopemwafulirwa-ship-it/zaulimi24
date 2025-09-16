# Seller Dashboard

This directory contains all the components and pages for the seller dashboard functionality.

## Features

1. **Dashboard Overview** - Shows key metrics and recent activity
2. **Product Management** - Create, read, update, and delete products
3. **Order Management** - View and manage customer orders
4. **Sales Analytics** - View sales reports and trends

## Components

- `DashboardOverview.tsx` - Main dashboard with statistics and recent activity
- `ProductList.tsx` - Table view of all products with edit/delete actions
- `ProductForm.tsx` - Form for creating new products
- `EditProductForm.tsx` - Form for editing existing products

## Pages

- `page.tsx` - Main seller portal page that redirects to dashboard
- `dashboard/page.tsx` - Main seller dashboard page with tab navigation

## Access

The seller dashboard is accessible at `/seller/dashboard` and is only available to authenticated users with the 'seller' role.