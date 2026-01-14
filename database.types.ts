export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      albums: {
        Row: {
          created_at: string
          description: string | null
          edit_writer: string | null
          id: number
          is_show: boolean | null
          origin_writer: string | null
          src: string | null
          thumbnail: string | null
          title: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          edit_writer?: string | null
          id?: number
          is_show?: boolean | null
          origin_writer?: string | null
          src?: string | null
          thumbnail?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          edit_writer?: string | null
          id?: number
          is_show?: boolean | null
          origin_writer?: string | null
          src?: string | null
          thumbnail?: string | null
          title?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "albums_edit_writer_fkey"
            columns: ["edit_writer"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "albums_origin_writer_fkey"
            columns: ["origin_writer"]
            isOneToOne: false
            referencedRelation: "members"
            referencedColumns: ["id"]
          },
        ]
      }
      members: {
        Row: {
          addr: string | null
          addr_detail: string | null
          admin_user: string | null
          avatar: string | null
          created_at: string
          duty: string | null
          email: string
          id: string
          is_deleted: boolean | null
          name: string
          phone: string
          position: string | null
          updated_at: string | null
          zonecode: string | null
        }
        Insert: {
          addr?: string | null
          addr_detail?: string | null
          admin_user?: string | null
          avatar?: string | null
          created_at?: string
          duty?: string | null
          email: string
          id?: string
          is_deleted?: boolean | null
          name: string
          phone: string
          position?: string | null
          updated_at?: string | null
          zonecode?: string | null
        }
        Update: {
          addr?: string | null
          addr_detail?: string | null
          admin_user?: string | null
          avatar?: string | null
          created_at?: string
          duty?: string | null
          email?: string
          id?: string
          is_deleted?: boolean | null
          name?: string
          phone?: string
          position?: string | null
          updated_at?: string | null
          zonecode?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "members_admin_user_fkey"
            columns: ["admin_user"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sermons: {
        Row: {
          created_at: string
          description: string | null
          edit_writer: string | null
          id: number
          is_show: boolean | null
          origin_writer: string | null
          published_date: string | null
          thumbnail: string | null
          title: string | null
          updated_at: string | null
          video_id: string
          youtube_URL: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          edit_writer?: string | null
          id?: number
          is_show?: boolean | null
          origin_writer?: string | null
          published_date?: string | null
          thumbnail?: string | null
          title?: string | null
          updated_at?: string | null
          video_id: string
          youtube_URL?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          edit_writer?: string | null
          id?: number
          is_show?: boolean | null
          origin_writer?: string | null
          published_date?: string | null
          thumbnail?: string | null
          title?: string | null
          updated_at?: string | null
          video_id?: string
          youtube_URL?: string | null
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          id: string
          is_deleted: boolean | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          id: string
          is_deleted?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_deleted?: boolean | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      status_enum: "invite" | "active" | "disable"
      user_role: "super" | "admin" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      status_enum: ["invite", "active", "disable"],
      user_role: ["super", "admin", "pending"],
    },
  },
} as const
