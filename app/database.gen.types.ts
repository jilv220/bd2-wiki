export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      character_costumes: {
        Row: {
          char_id: string | null
          costume_name: string
          created_at: string
          icon_costume_id: string
          icon_range_id: string
          id: string
          potential: Json
          skill_name: string
          skillicon_id: string
          target: Database["public"]["Enums"]["target_type"]
          updated_at: string
        }
        Insert: {
          char_id?: string | null
          costume_name: string
          created_at?: string
          icon_costume_id: string
          icon_range_id?: string
          id: string
          potential: Json
          skill_name?: string
          skillicon_id?: string
          target?: Database["public"]["Enums"]["target_type"]
          updated_at?: string
        }
        Update: {
          char_id?: string | null
          costume_name?: string
          created_at?: string
          icon_costume_id?: string
          icon_range_id?: string
          id?: string
          potential?: Json
          skill_name?: string
          skillicon_id?: string
          target?: Database["public"]["Enums"]["target_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_costumes_char_id_fkey"
            columns: ["char_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_costumes_char_id_fkey"
            columns: ["char_id"]
            isOneToOne: false
            referencedRelation: "characters_core_view"
            referencedColumns: ["id"]
          },
        ]
      }
      character_exclusive_gears: {
        Row: {
          basic_stat: Json
          created_at: string
          exclusive_ability: Json
          icon_equipment_id: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          basic_stat: Json
          created_at?: string
          exclusive_ability: Json
          icon_equipment_id: string
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          basic_stat?: Json
          created_at?: string
          exclusive_ability?: Json
          icon_equipment_id?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_exclusive_gears_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_exclusive_gears_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "characters_core_view"
            referencedColumns: ["id"]
          },
        ]
      }
      character_stats: {
        Row: {
          atk: number
          created_at: string
          crit_dmg: number
          crit_rate: number
          def: number
          hp: number
          id: string
          magic_atk: number
          magic_resist: number
          updated_at: string
        }
        Insert: {
          atk: number
          created_at?: string
          crit_dmg: number
          crit_rate: number
          def: number
          hp: number
          id: string
          magic_atk?: number
          magic_resist: number
          updated_at?: string
        }
        Update: {
          atk?: number
          created_at?: string
          crit_dmg?: number
          crit_rate?: number
          def?: number
          hp?: number
          id?: string
          magic_atk?: number
          magic_resist?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_stats_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_stats_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "characters_core_view"
            referencedColumns: ["id"]
          },
        ]
      }
      character_talents: {
        Row: {
          bufficon_id: string
          created_at: string
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          bufficon_id: string
          created_at?: string
          id: string
          name: string
          updated_at?: string
        }
        Update: {
          bufficon_id?: string
          created_at?: string
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "character_talents_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_talents_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "characters_core_view"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          attack_icon_misc_id: string
          attack_property: Database["public"]["Enums"]["attack_type"]
          created_at: string
          element_icon_misc_id: string
          element_property: Database["public"]["Enums"]["element_type"]
          id: string
          illust_inven_char_id: string
          knock_back: Database["public"]["Enums"]["knock_back_type"]
          name: string
          rarity: number
          target: Database["public"]["Enums"]["target_type"]
          updated_at: string
        }
        Insert: {
          attack_icon_misc_id: string
          attack_property: Database["public"]["Enums"]["attack_type"]
          created_at?: string
          element_icon_misc_id: string
          element_property: Database["public"]["Enums"]["element_type"]
          id: string
          illust_inven_char_id: string
          knock_back: Database["public"]["Enums"]["knock_back_type"]
          name: string
          rarity: number
          target: Database["public"]["Enums"]["target_type"]
          updated_at?: string
        }
        Update: {
          attack_icon_misc_id?: string
          attack_property?: Database["public"]["Enums"]["attack_type"]
          created_at?: string
          element_icon_misc_id?: string
          element_property?: Database["public"]["Enums"]["element_type"]
          id?: string
          illust_inven_char_id?: string
          knock_back?: Database["public"]["Enums"]["knock_back_type"]
          name?: string
          rarity?: number
          target?: Database["public"]["Enums"]["target_type"]
          updated_at?: string
        }
        Relationships: []
      }
      costume_skills: {
        Row: {
          chain: number
          cooldown: number
          costume_id: string
          created_at: string
          description: string
          icon_range_id: string
          level: number
          sp_cost: number
          target: Database["public"]["Enums"]["target_type"]
          updated_at: string
        }
        Insert: {
          chain: number
          cooldown: number
          costume_id: string
          created_at?: string
          description: string
          icon_range_id: string
          level: number
          sp_cost: number
          target: Database["public"]["Enums"]["target_type"]
          updated_at?: string
        }
        Update: {
          chain?: number
          cooldown?: number
          costume_id?: string
          created_at?: string
          description?: string
          icon_range_id?: string
          level?: number
          sp_cost?: number
          target?: Database["public"]["Enums"]["target_type"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "costume_skills_costume_id_fkey"
            columns: ["costume_id"]
            isOneToOne: false
            referencedRelation: "character_costumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "costume_skills_costume_id_fkey"
            columns: ["costume_id"]
            isOneToOne: false
            referencedRelation: "character_costumes_view"
            referencedColumns: ["id"]
          },
        ]
      }
      costume_upgrades: {
        Row: {
          chain: number
          cooldown: number
          costume_id: string
          created_at: string
          description: string
          level: number
          sp_cost: number
          updated_at: string
        }
        Insert: {
          chain: number
          cooldown: number
          costume_id: string
          created_at?: string
          description: string
          level: number
          sp_cost: number
          updated_at?: string
        }
        Update: {
          chain?: number
          cooldown?: number
          costume_id?: string
          created_at?: string
          description?: string
          level?: number
          sp_cost?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "costume_upgrades_costume_id_fkey"
            columns: ["costume_id"]
            isOneToOne: false
            referencedRelation: "character_costumes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "costume_upgrades_costume_id_fkey"
            columns: ["costume_id"]
            isOneToOne: false
            referencedRelation: "character_costumes_view"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
          website: string | null
        }
        Insert: {
          avatar_url?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Update: {
          avatar_url?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
          website?: string | null
        }
        Relationships: []
      }
      talent_ranks: {
        Row: {
          cost: number
          created_at: string
          description: string
          level: number
          name: string
          talent_id: string
          updated_at: string
        }
        Insert: {
          cost: number
          created_at?: string
          description: string
          level: number
          name: string
          talent_id: string
          updated_at?: string
        }
        Update: {
          cost?: number
          created_at?: string
          description?: string
          level?: number
          name?: string
          talent_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "talent_ranks_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "character_talents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "talent_ranks_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "character_talents_view"
            referencedColumns: ["id"]
          },
        ]
      }
      task_orders: {
        Row: {
          category: Database["public"]["Enums"]["task_category"]
          position: number
          task_id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: Database["public"]["Enums"]["task_category"]
          position: number
          task_id: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: Database["public"]["Enums"]["task_category"]
          position?: number
          task_id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "task_orders_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          category: Database["public"]["Enums"]["task_category"]
          created_at: string | null
          description: string | null
          id: string
          title: string
          updated_at: string | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["task_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          title: string
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["task_category"]
          created_at?: string | null
          description?: string | null
          id?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      user_tasks: {
        Row: {
          assigned_date: string
          is_finished: boolean
          task_id: string
          user_id: string
        }
        Insert: {
          assigned_date?: string
          is_finished?: boolean
          task_id: string
          user_id: string
        }
        Update: {
          assigned_date?: string
          is_finished?: boolean
          task_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      character_costumes_view: {
        Row: {
          chain: number | null
          char_id: string | null
          cooldown: number | null
          costume_name: string | null
          created_at: string | null
          description: string | null
          icon_costume_id: string | null
          icon_range_id: string | null
          id: string | null
          level: number | null
          potential: Json | null
          skill_name: string | null
          skillicon_id: string | null
          sp_cost: number | null
          target: Database["public"]["Enums"]["target_type"] | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "character_costumes_char_id_fkey"
            columns: ["char_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_costumes_char_id_fkey"
            columns: ["char_id"]
            isOneToOne: false
            referencedRelation: "characters_core_view"
            referencedColumns: ["id"]
          },
        ]
      }
      character_talents_view: {
        Row: {
          bufficon_id: string | null
          cost: number | null
          created_at: string | null
          description: string | null
          id: string | null
          name: string | null
          rank_level: number | null
          rank_name: string | null
          updated_at: string | null
        }
        Relationships: [
          {
            foreignKeyName: "character_talents_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "character_talents_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "characters_core_view"
            referencedColumns: ["id"]
          },
        ]
      }
      characters_core_view: {
        Row: {
          atk: number | null
          attack_icon_misc_id: string | null
          attack_property: Database["public"]["Enums"]["attack_type"] | null
          basic_stat: Json | null
          created_at: string | null
          crit_dmg: number | null
          crit_rate: number | null
          def: number | null
          element_icon_misc_id: string | null
          element_property: Database["public"]["Enums"]["element_type"] | null
          exclusive_ability: Json | null
          hp: number | null
          id: string | null
          illust_inven_char_id: string | null
          knock_back: Database["public"]["Enums"]["knock_back_type"] | null
          magic_atk: number | null
          magic_resist: number | null
          name: string | null
          rarity: number | null
          target: Database["public"]["Enums"]["target_type"] | null
          updated_at: string | null
        }
        Relationships: []
      }
      user_tasks_with_position: {
        Row: {
          assigned_date: string | null
          category: Database["public"]["Enums"]["task_category"] | null
          is_finished: boolean | null
          position: number | null
          task_id: string | null
          title: string | null
          user_id: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_tasks_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      reset_daily_tasks: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      attack_type: "physical" | "magical"
      element_type: "fire" | "water" | "wind" | "light" | "dark" | "none"
      knock_back_type: "left_back" | "right_back" | "back" | "front"
      target_type: "very_front" | "vault" | "ally"
      task_category: "essential" | "optional" | "seasonal"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
